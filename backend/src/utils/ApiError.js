export class ApiError extends Error {
    constructor(statusCode, errorCode, message, details = undefined) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
    }
}