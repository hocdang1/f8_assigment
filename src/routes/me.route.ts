import { Router } from 'express';

import meController from '../controllers/me.controller';

const router = Router();

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

export default router;
