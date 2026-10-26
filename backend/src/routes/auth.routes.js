import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
    register,
    login,
    getMe,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validateRequest.js";
import {
    registerSchema,
    loginSchema,
} from "../validators/auth.validators.js";

const router = Router();

function createAuthLimiter(limit, message) {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        limit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (_req, res) => {
            res.status(429).json({
                success: false,
                error: {
                    code: "RATE_LIMITED",
                    message,
                },
            });
        },
    });
}

const registerLimiter = createAuthLimiter(
    5,
    "Too many registration attempts. Please try again later."
);

const loginLimiter = createAuthLimiter(
    10,
    "Too many login attempts. Please try again later."
);

router.post(
    "/register",
    registerLimiter,
    validateBody(registerSchema),
    register
);

router.post(
    "/login",
    loginLimiter,
    validateBody(loginSchema),
    login
);

router.get("/me", requireAuth, getMe);

export default router;