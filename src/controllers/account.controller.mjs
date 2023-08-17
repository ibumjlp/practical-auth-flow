import User from "../models/user.model.mjs";

export async function getAccount(req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({
            message: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}