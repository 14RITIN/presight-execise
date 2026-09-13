import { Router } from 'express';

import {
  getUserFilterOptions,
  getUsers,
} from './user.controller';

const router = Router();

router.get('/filter-options', getUserFilterOptions);
router.get('/', getUsers);

export default router;