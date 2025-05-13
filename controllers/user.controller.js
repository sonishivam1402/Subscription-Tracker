import User from '../models/user.model.js';

export const getUsers = async (req , res , next) => {
    try{
        const users = await User.find();
        res.status(200).json({success: true, data: users});
    } catch(error){
        next(error);
    }
}

export const getUser = async (req , res , next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({success: true, data: user});
    } catch(error){
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 400;
            throw error;
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
