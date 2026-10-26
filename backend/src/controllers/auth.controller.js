import {
    registerUser,
    loginUser,
    getUserById,
} from "../services/auth.service.js";

export async function register(req, res, next) {
    try {
        const result = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const result = await loginUser(req.body);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export async function getMe(req, res, next) {
    try {
        const user = await getUserById(req.auth.userId);

        return res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}