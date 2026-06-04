// src/routes/authRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");

const users =
    require("../data/users");

const router =
    express.Router();

const JWT_SECRET =
    "bex-secret-key";

router.post(
    "/login",
    (req, res) => {

        const {
            email,
            password,
        } = req.body;

        const user =
            users.find(
                (item) =>
                    item.email ===
                    email &&
                    item.password ===
                    password
            );

        if (!user) {

            return res.status(401)
                .json({
                    status: false,
                    message:
                        "Invalid email or password",
                });
        }

        const token =
            jwt.sign(
                {
                    id: user.id,
                    email:
                        user.email,
                    role:
                        user.role,
                },
                JWT_SECRET,
                {
                    expiresIn:
                        "1h",
                }
            );

        const {
            password: pwd,
            ...userData
        } = user;

        return res.json({
            status: true,
            message:
                "Login successfully",
            data: {
                user: userData,
                token,
            },
        });
    }
);

module.exports = router;