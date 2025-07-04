let { validationResult ,check} = require('express-validator') ;

let validatorMiddleware = (req, res, next) => {
    try {
        check('title').notEmpty().withMessage('Title is required').escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('Title can only contain letters, numbers, and spaces').run(req);
        check('description').notEmpty().withMessage('Description is required').escape()
        result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        next();
    } catch (error) {
        console.error("Error in validatorMiddleware:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = validatorMiddleware;
