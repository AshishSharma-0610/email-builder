import EmailTemplate from '../models/emailTemplate.js';

export const getTemplates = async (req, res) => {
    try {
        const templates = await EmailTemplate.find().sort({ updatedAt: -1 });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching templates' });
    }
};

export const getTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching template' });
    }
};

export const updateTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        res.status(500).json({ error: 'Error updating template' });
    }
};

export const deleteTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findByIdAndDelete(req.params.id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting template' });
    }
};

