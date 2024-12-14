import express from 'express';
import { createUser, getUsers, deleteUser, updateUser } from '../controllers/userController'; 

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

export default router;