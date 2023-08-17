import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";

async function checkDuplicateUser(body) {
    try {
        const { username, email } = body;

        let usernameExists = await User.findOne({ username });
        let emailExists = await User.findOne({ email });

        if (usernameExists || emailExists) return {
            status: 401,
            message: "Your email address or username are already in use."
        };
        return { status: 200 };
    } catch (err) {
        // console.error(err);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

async function registrationDataStorage(body) {
    try {
        const { username, email, password } = body;
        const saltRounds = 10;

        const hash = await bcrypt.hash(password, saltRounds);

        try {
            let user = new User({
                username,
                email,
                password: hash,
            });
            await user.save();

            return {
                status: 200,
                message: "User created successfully",
                data: user
            };
        } catch (saveErr) {
            console.error(saveErr);
            return {
                status: 500,
                message: "Failed to create user"
            };
        }
    } catch (err) {
        // console.error(err);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

async function authenticateUser(body) {
    try {
        const { login_type, username, email, password } = body;

        let user = null;

        if (login_type === "username") {
            user = await User.findOne({ username });
        } else if (login_type === "email") {
            user = await User.findOne({ email });
        } else {
            return {
                status: 401,
                message: "Invalid Credentials"
            };
        }

        if (!user) return {
            status: 401,
            message: "Invalid Credentials"
        };

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return { status: 200, data: user };
        return {
            status: 401,
            message: "Invalid Credentials"
        }
    } catch (err) {
        // console.error(err);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

async function generateTokens(user) {
    try {
        const data = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });
        const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

        return {
            status: 200,
            message: "User Logged in Successfully",
            data: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        };
    } catch (err) {
        // console.error(err);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

async function refreshToken(token) {
    try {
        const user = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        const data = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });

        return {
            status: 200,
            message: "Verification is successful",
            data: {
                access_token: accessToken
            }
        };
    } catch (err) {
        // console.error(err);
        return {
            status: 500,
            message: "Internal Server Error"
        };
    }
}

const authService = {
    checkDuplicateUser,
    registrationDataStorage,
    authenticateUser,
    generateTokens,
    refreshToken
}

export default authService