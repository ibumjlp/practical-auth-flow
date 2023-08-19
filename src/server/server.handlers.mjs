// catch 404 and forward to error handler
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: "No such route exists"
    });
};

// Internal server error handler
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: "Internal server error"
    });
};