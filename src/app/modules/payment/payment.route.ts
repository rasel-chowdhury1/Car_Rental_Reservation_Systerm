import { Router } from 'express';
import { paymentControler } from './payment.controller';

const router = Router();

router.get("/history/:userId", paymentControler.paymentHistoryByUser)
router.post('/confirmation', paymentControler.confirmationController)


export const paymentRoutes = router;
