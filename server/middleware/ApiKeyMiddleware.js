let ApiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['apikey'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
}

module.exports = ApiKeyMiddleware;