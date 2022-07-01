import { Router } from 'express';
import adminroutes from './admin/adminRoutes'
import userRoutes from './user/userRoutes'

const router = Router();

router.use('/', userRoutes);
router.use('/admin',adminroutes);

export default router;