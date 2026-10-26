import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export function requireAuth(req, res, next) {
    const authorization = req.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
        return next(
            new ApiError(
                401,
                "AUTHENTICATION_REQUIRED",
                "A valid Bearer token is required."
            )
        );
    }

    const token = authorization.slice("Bearer ".length).trim();

    if (!token) {
        return next(
            new ApiError(
                401,
                "AUTHENTICATION_REQUIRED",
                "A valid Bearer token is required."
            )
        );
    }

    const secret = process.env.JWT_SECRET;

    if (
        !secret ||
        secret.length < 32 ||
        secret.toLowerCase().includes("placeholder")
    ) {
        return next(
            new ApiError(
                500,
                "AUTH_CONFIGURATION_ERROR",
                "Authentication is not configured correctly."
            )
        );
    }

    try {
        const payload = jwt.verify(token, secret, {
            algorithms: ["HS256"],
            issuer: "tuneforge-api",
            audience: "tuneforge-client",
        });

        if (typeof payload === "string" || !payload.sub) {
            throw new Error("Invalid token subject.");
        }

        req.auth = { userId: payload.sub };
        return next();
    } catch (error) {
        const expired = error.name === "TokenExpiredError";

        return next(
            new ApiError(
                401,
                expired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
                expired
                    ? "Your session has expired. Please log in again."
                    : "The authentication token is invalid."
            )
        );
    }
}