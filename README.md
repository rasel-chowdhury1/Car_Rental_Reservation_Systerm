
# Car Rental Reservation System
## Key Features

### 1. Authentication and Authorization
      - Secure sign-in and sign-up for users and admins using JWT.
      - Role-based access control for different functionalities.

### 2. Admin Capabilities
    - Create, update, and delete car listings.
    - View all bookings and update the end time of a booking.
    
### 3. User Capabilities
    - View all available cars and specific car details.
    - Book a car and view personal bookings.
    
## Technology Stack
### - Backend: TypeScript, Express.js
### - Authentication:  JWT (JSON Web Tokens), bcrypt
### - Database:  MongoDB with Mongoose ODM
### - Validation:  Joi for type validation

## API Endpoints
### 1. User Authentication
 -Sign In
   -POST /api/auth/signin
 -Sign Up
   -POST /api/auth/signup
### 2. Cars Management
#### - Admin Actions (Authorization: Admin Bearer Token)
 - Create Car: POST /api/cars
 - Update Car: PUT /api/cars/${carId}
 - Delete Car: DELETE /api/cars/${carId}
#### - Public Actions
  - Get All Cars: GET /api/cars
  - Get Specific Car: GET /api/cars/${carId}
### 3. Bookings Management
#### - Admin Actions (Authorization: Admin Bearer Token)
   - Get All Bookings (Search by carId and date): GET /api/bookings?carId=...&date=...
   - Update Booking End Time: PUT /api/bookings/return
#### - User Actions (Authorization: User Bearer Token)
  - Create Booking: POST /api/bookings
  - Get User's Bookings: GET /api/bookings/my-bookings
Getting Started
To use this project, follow these steps:

Clone the repository:

bash
Copy code
git clone <repository-url>
Install the dependencies:

bash
Copy code
npm install
Set up environment variables for MongoDB connection, JWT secret, etc.

Run the development server:

bash
Copy code
npm start
Feedback
If you have any feedback or encounter any issues, please don't hesitate to inform us.

Thank you for using our Car Rental Reservation System!

