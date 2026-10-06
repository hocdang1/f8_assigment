import { Router } from 'express';

import courseRoutes from './course.route';
import meRoutes from './me.route';

const router = Router();

router.use('/courses', courseRoutes);
router.use('/me', meRoutes);

export default router;
