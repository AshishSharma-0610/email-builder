import express from 'express';
import {
    getTemplates,
    getTemplate,
    deleteTemplate,
    updateTemplate
} from '../controllers/templateController.js';

const router = express.Router();

router.get('/templates', getTemplates);
router.get('/templates/:id', getTemplate);
router.put('/templates/:id', updateTemplate);
router.delete('/templates/:id', deleteTemplate);

export default router;

