export const validateTemplate = (req, res, next) => {
    const { title, content } = req.body;

    const errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }

    if (title && title.length > 100) {
        errors.push('Title must be less than 100 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

