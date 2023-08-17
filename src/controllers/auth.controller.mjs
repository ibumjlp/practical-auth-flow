import authService from "../services/auth.service.mjs";

export async function signUp(req, res, next) {
    try {
        const duplicateResult = await authService.checkDuplicateUser(req.body);
        if (duplicateResult.status !== 200) return res.status(duplicateResult.status).json({ message: duplicateResult.message });

        const registrationResult = await authService.registrationDataStorage(req.body);
        if (registrationResult.status !== 200) return res.status(registrationResult.status).json({ message: registrationResult.message });

        return res.json({ message: registrationResult.message, data: registrationResult.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function signIn(req, res, next) {
    try {
        const authenticateResult = await authService.authenticateUser(req.body);
        if (authenticateResult.status !== 200) return res.status(authenticateResult.status).json({ message: authenticateResult.message });

        const generateResult = await authService.generateTokens(authenticateResult.data);
        if (generateResult.status !== 200) return res.status(generateResult.status).json({ message: generateResult.message });

        return res.json({ message: generateResult.message, data: generateResult.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function refreshToken(req, res, next) {
    try {
        const refreshResult = await authService.refreshToken(req.body.refresh_token);
        if (refreshResult.status !== 200) return res.status(refreshResult.status).json({ message: refreshResult.message });

        return res.json({ message: refreshResult.message, data: refreshResult.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};