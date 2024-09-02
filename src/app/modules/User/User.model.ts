import { Schema, model } from "mongoose";
import { TUser } from "./User.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new  Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user','admin']
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

// pre save middelware/hood : will work on create() save()
UserSchema.pre('save', async function(next){
    // console.log("Pre hook will save user data", this);

    const user = this;
    //hashing password and save into db
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_sold_rounds) )
    next()
})

// post save middelware/hook : worked on create() save()
UserSchema.post('save', function(doc, next){
    doc.password = '',
    // console.log('post hook we saved user data -> ', this)
    next()
  })

export const UserModel = model<TUser>("User", UserSchema);