import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { topUp } from '../controllers/walletController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { topUpSchema } from '../validators/walletValidators.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/topUp', validateRequest(topUpSchema), topUp)

export default router;