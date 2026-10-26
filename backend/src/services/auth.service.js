import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "./prisma.js";
import { ApiError } from "../utils/ApiError.js";

const publicUserSelect = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
};

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (
        !secret ||
        secret.length < 32 ||
        secret.toLowerCase().includes("placeholder")
    ) {
        throw new ApiError(
            500,
            "AUTH_CONFIGURATION_ERROR",
            "Authentication is not configured correctly."
        );
    }

    return secret;
}

function createToken(userId) {
    return jwt.sign({}, getJwtSecret(), {
        subject: userId,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        algorithm: "HS256",
        issuer: "tuneforge-api",
        audience: "tuneforge-client",
    });
}

export async function registerUser({ name, email, password }) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "EMAIL_ALREADY_REGISTERED",
            "An account with this email already exists."
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    let user;

    try {
        user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
            select: publicUserSelect,
        });
    } catch (error) {
        // Handles two registrations racing to use the same email.
        if (error.code === "P2002") {
            throw new ApiError(
                409,
                "EMAIL_ALREADY_REGISTERED",
                "An account with this email already exists."
            );
        }

        throw error;
    }

    return {
        user,
        token: createToken(user.id),
        tokenType: "Bearer",
    };
}

export async function loginUser({ email, password }) {
    const userRecord = await prisma.user.findUnique({
        where: { email },
    });

    if (
        !userRecord ||
        !(await bcrypt.compare(password, userRecord.passwordHash))
    ) {
        throw new ApiError(
            401,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect."
        );
    }

    const { passwordHash: _passwordHash, ...user } = userRecord;

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token: createToken(user.id),
        tokenType: "Bearer",
    };
}

export async function getUserById(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: publicUserSelect,
    });

    if (!user) {
        throw new ApiError(
            401,
            "INVALID_TOKEN",
            "The authenticated user no longer exists."
        );
    }

    return user;
}