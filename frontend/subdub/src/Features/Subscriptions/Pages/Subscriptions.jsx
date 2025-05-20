import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import fetchSubscriptions from '../../Dashboard/Services/fetchSubscriptions';
import cancelSubscription from '../Services/cancelSubscription';
import updateSubscription from '../Services/updateSubscription';
import addSubscription from '../Services/addSubscription';

const SubscriptionModal = ({ isOpen, onClose, onSubmit, existingData }) => {
    const initialFormData = {
        name: '',
        price: '',
        currency: 'USD',
        frequency: 'monthly',
        category: '',
        paymentMethod: '',
        status: 'active',
        startDate: '',
        renewalDate: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (existingData) {
            setFormData({
                ...existingData,
                price: existingData.price.toString(),
                startDate: existingData.startDate.split('T')[0],
                renewalDate: existingData.renewalDate.split('T')[0],
            });
        } else {
            setFormData(initialFormData);
        }
    }, [existingData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, price: parseFloat(formData.price) });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-lg relative">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    {existingData ? 'Update Subscription' : 'Add Subscription'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
                        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
                        <select name="currency" value={formData.currency} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                        </select>
                        <select name="frequency" value={formData.frequency} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <select name="category" value={formData.category} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
                            <option value="">Select Category</option>
                            <option value="sports">Sports</option>
                            <option value="news">News</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="technology">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="politics">Politics</option>
                            <option value="other">Other</option>
                        </select>
                        <input name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
                        <select name="status" value={formData.status} onChange={handleChange} className="p-2 rounded-xl border border-gray-300">
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
                        <input type="date" name="renewalDate" value={formData.renewalDate} onChange={handleChange} className="p-2 rounded-xl border border-gray-300" />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-400 text-gray-600">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-2xl text-white font-medium bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 shadow-md">
                            {existingData ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const getStatusBadgeClass = (status) => {
    const colorMap = {
        active: 'bg-green-200 text-green-800',
        expired: 'bg-yellow-200 text-yellow-800',
        cancelled: 'bg-red-200 text-red-800'
    };
    return colorMap[status] || 'bg-gray-200 text-gray-700';

};

const getFrequencyBadgeClass = (freq) => {
    const map = {
        daily: 'bg-blue-100 text-blue-700',
        weekly: 'bg-purple-100 text-purple-700',
        monthly: 'bg-indigo-100 text-indigo-700',
        yearly: 'bg-pink-100 text-pink-700',
    };
    return map[freq] || 'bg-gray-100 text-gray-700';
};

const getCategoryBadgeClass = (cat) => {
    const map = {
        sports: 'bg-green-100 text-green-700',
        news: 'bg-blue-100 text-blue-700',
        entertainment: 'bg-pink-100 text-pink-700',
        lifestyle: 'bg-purple-100 text-purple-700',
        technology: 'bg-indigo-100 text-indigo-700',
        finance: 'bg-yellow-100 text-yellow-700',
        politics: 'bg-red-100 text-red-700',
        other: 'bg-gray-100 text-gray-700',
    };
    return map[cat] || 'bg-gray-100 text-gray-700';
};


const SubscriptionCard = ({ data, onEdit, onCancel }) => (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-5">
                <span className="font-semibold text-lg text-gray-800">{data.name}</span>
                <span className="text-sm text-gray-500">Price: ${data.price} {data.currency}</span>
                <span className="text-sm text-gray-500">Renewal: {dayjs(data.renewalDate).format("YYYY-MM-DD")}</span>
            </div>
            <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getFrequencyBadgeClass(data.frequency)}`}>
                    {data.frequency}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeClass(data.category)}`}>
                    {data.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(data.status)} capitalize`}>
                    {data.status}
                </span>
            </div>
        </div>
        <div className="flex flex-col items-end gap-2">

            <div className="flex gap-2">
                <button onClick={() => onEdit(data)} className="text-sm px-3 py-1 rounded-xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white">Edit</button>
                <button onClick={() => onCancel(data._id)} className="text-sm px-3 py-1 rounded-xl border border-gray-400 text-gray-600">Cancel</button>
            </div>
        </div>
    </div>

);

const SubscriptionManager = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSub, setEditingSub] = useState(null);

    useEffect(() => {
        const loadSubscriptions = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));
                if (token != null && user != null) {
                    const response = await fetchSubscriptions(user._id);
                    if (response.data && response.data.length > 0) {
                        setSubscriptions(response.data);
                    }
                }
            } catch (error) {
                console.error('Error loading subscriptions:', error);
            }
        };

        loadSubscriptions();
    }, []);

    const handleAddOrUpdate = async (data) => {
        try {
            if (editingSub) {
                const res = await updateSubscription(editingSub._id, data);
                if (res) {
                    setSubscriptions(subs => subs.map(s => s._id === editingSub._id ? res.data : s));
                }
            } else {
                const res = await addSubscription(data);
                if (res) {
                    setSubscriptions(subs => [...subs, res.data]);
                }
            }
            setModalOpen(false);
            setEditingSub(null);
        } catch (err) {
            console.error('Failed to save subscription:', err);
        }
    };

    const handleCancel = async (id) => {
        try {
            const response = await cancelSubscription(id);
            if (response) {
                setSubscriptions(subs => subs.map(s => s._id === id ? { ...s, status: 'cancelled' } : s));
            }

        } catch (err) {
            console.error('Failed to cancel subscription:', err);
        }
    };

    return (
        <div className='bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6'>
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        My Subscriptions
                    </h1>
                    <button onClick={() => { setEditingSub(null); setModalOpen(true); }} className="px-6 py-2 rounded-2xl text-white font-medium bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 shadow-md">
                        Add Subscription
                    </button>
                </div>
                <div className="space-y-4">
                    {subscriptions.map(sub => (
                        <SubscriptionCard
                            key={sub._id}
                            data={sub}
                            onEdit={(data) => { setEditingSub(data); setModalOpen(true); }}
                            onCancel={handleCancel}
                        />
                    ))}
                </div>

                <SubscriptionModal
                    isOpen={modalOpen}
                    onClose={() => { setModalOpen(false); setEditingSub(null); }}
                    onSubmit={handleAddOrUpdate}
                    existingData={editingSub}
                />
            </div>
        </div>
    );
};

export default SubscriptionManager;