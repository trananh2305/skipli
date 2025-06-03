import { Router } from 'express';
import { createAccessCode, validateAccessCode } from '../controllers/authController.js';

const router = Router();

router.post('/create-access-code', createAccessCode);
router.post('/validate-access-code', validateAccessCode);

export default router;
