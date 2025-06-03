import { Router } from 'express';
import { createEmployee, getEmployee, deleteEmployee, getAllEmployee } from '../controllers/employeeController.js';

const router = Router();

router.post('/', createEmployee);
router.get("/", getAllEmployee);
router.get('/:email', getEmployee);
router.delete('/:email', deleteEmployee);

export default router;
