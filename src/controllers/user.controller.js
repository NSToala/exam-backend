import User from "../models/User";

export const getUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    
    return res.status(200).json(users);
};

export const autocomplete = async (req, res) => {
    const { email } = req.params;
    const users = await User.find({"email": { $regex: email }}).populate("roles");
    
    return res.status(200).json(users);
};