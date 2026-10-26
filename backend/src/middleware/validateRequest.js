export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "The request body contains invalid data.",
                    details: result.error.issues.map((issue) => ({
                        field: issue.path.map(String).join("."),
                        message: issue.message,
                    })),
                },
            });
        }

        req.body = result.data;
        next();
    };
}