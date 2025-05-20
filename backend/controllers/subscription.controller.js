import Subscription from "../models/subscription.model.js"
import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";


export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find().populate('user', 'name email');
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0
        })

        res.status(201).json({ success: true, data: { subscription, workflowRunId } });

    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true , context : 'query'}
        );

        if (!updatedSubscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const deleted = await Subscription.findByIdAndDelete(req.params.id);

        if (!deleted) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (error) {
        next(error);
    }
};


export const getUserSubscriptions = async (req, res, next) => {
    try {

        if (req.user.id != req.params.id) {
            const error = new Error('You are not owner of this account.');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        return res.status(200).json({ success: true, data: subscriptions });

    } catch (e) {
        next(e)
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );


        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully',
            data: subscription,
        });

    } catch (error) {
        next(error);
    }
};


export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const upcoming = await Subscription.find({
            nextRenewalDate: { $gte: today, $lte: nextWeek },
            status: 'active',
        });

        res.status(200).json({ success: true, data: upcoming });
    } catch (error) {
        next(error);
    }
};
