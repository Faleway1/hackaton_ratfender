export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 409)
    }
}

export class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404)
    }
}