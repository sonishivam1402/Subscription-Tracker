import { useState, useEffect } from "react";
import { CalendarDays, CreditCard, DollarSign, PieChart, AlertCircle, Calendar, Tag, ChevronRight, Plus } from "lucide-react";
import fetchSubscriptions from "../Services/fetchSubscriptions";

// Utility functions
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const calculateTotalExpense = (subscriptions, period = 'monthly') => {
  let total = 0;

  subscriptions.forEach(sub => {
    const price = sub.price;

    if (sub.frequency === 'monthly') {
      total += period === 'monthly' ? price : price * 12;
    } else if (sub.frequency === 'yearly') {
      total += period === 'monthly' ? price / 12 : price;
    } else if (sub.frequency === 'weekly') {
      total += period === 'monthly' ? price * 4.33 : price * 52;
    } else if (sub.frequency === 'quarterly') {
      total += period === 'monthly' ? price / 3 : price * 4;
    }
  });

  return total;
};

const categorizeSubscriptions = (subscriptions) => {
  const categories = {};

  subscriptions.forEach(sub => {
    if (!categories[sub.category]) {
      categories[sub.category] = 0;
    }
    categories[sub.category] += sub.price;
  });

  return Object.entries(categories).map(([name, total]) => ({ name, total }));
};

const getUpcomingRenewals = (subscriptions) => {
  const now = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(now.getMonth() + 1);

  return subscriptions
    .filter(sub => {
      const renewalDate = new Date(sub.renewalDate);
      return renewalDate >= now && renewalDate <= oneMonthLater && sub.status !== 'expired';
    })
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
};

// Mock data for initial display
const mockSubscriptions = [
  {
    _id: "6821ffdd4092e7c30e100129",
    name: "Amazon TV",
    price: 9.99,
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "Credit Card",
    status: "expired",
    startDate: "2025-01-20T00:00:00.000Z",
    renewalDate: "2025-02-20T00:00:00.000Z",
    user: "681df024fa09a0ad68960edb",
    createdAt: "2025-05-12T12:30:53.465Z",
    updatedAt: "2025-05-12T12:30:53.465Z"
  },
  {
    _id: "6821ffdd4092e7c30e100130",
    name: "Netflix",
    price: 14.99,
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "Debit Card",
    status: "active",
    startDate: "2025-01-15T00:00:00.000Z",
    renewalDate: "2025-05-15T00:00:00.000Z",
    user: "681df024fa09a0ad68960edb",
    createdAt: "2025-05-12T12:30:53.465Z",
    updatedAt: "2025-05-12T12:30:53.465Z"
  },
  {
    _id: "6821ffdd4092e7c30e100131",
    name: "Spotify",
    price: 9.99,
    currency: "USD",
    frequency: "monthly",
    category: "music",
    paymentMethod: "PayPal",
    status: "active",
    startDate: "2025-01-10T00:00:00.000Z",
    renewalDate: "2025-05-28T00:00:00.000Z",
    user: "681df024fa09a0ad68960edb",
    createdAt: "2025-05-12T12:30:53.465Z",
    updatedAt: "2025-05-12T12:30:53.465Z"
  },
  {
    _id: "6821ffdd4092e7c30e100132",
    name: "Adobe Creative Cloud",
    price: 52.99,
    currency: "USD",
    frequency: "monthly",
    category: "software",
    paymentMethod: "Credit Card",
    status: "active",
    startDate: "2024-12-05T00:00:00.000Z",
    renewalDate: "2025-06-05T00:00:00.000Z",
    user: "681df024fa09a0ad68960edb",
    createdAt: "2025-05-12T12:30:53.465Z",
    updatedAt: "2025-05-12T12:30:53.465Z"
  },
  {
    _id: "6821ffdd4092e7c30e100133",
    name: "Microsoft 365",
    price: 99.99,
    currency: "USD",
    frequency: "yearly",
    category: "software",
    paymentMethod: "Credit Card",
    status: "active",
    startDate: "2025-01-01T00:00:00.000Z",
    renewalDate: "2026-01-01T00:00:00.000Z",
    user: "681df024fa09a0ad68960edb",
    createdAt: "2025-05-12T12:30:53.465Z",
    updatedAt: "2025-05-12T12:30:53.465Z"
  }
];

export default function SubscriptionDashboard() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    const loadSubscriptions = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const upcomingRenewals = getUpcomingRenewals(subscriptions);
  const totalMonthly = calculateTotalExpense(subscriptions, 'monthly');
  const totalYearly = calculateTotalExpense(subscriptions, 'yearly');
  const categoryData = categorizeSubscriptions(subscriptions);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const expiredSubscriptions = subscriptions.filter(sub => sub.status === 'expired');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Dashboard
            </span>
          </h1>
          <button className="flex items-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:opacity-90 transition-opacity">
            <Plus size={20} className="mr-2" />
            Add Subscription
          </button>
        </div> */}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <CreditCard className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-gray-700 text-lg font-medium">Active Subscriptions</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{activeSubscriptions.length}</p>
            <p className="text-sm text-gray-500 mt-2">
              {expiredSubscriptions.length} expired
            </p>
          </div>

          <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-lg mr-4">
                <DollarSign className="text-pink-500" size={24} />
              </div>
              <h3 className="text-gray-700 text-lg font-medium">Monthly Expense</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalMonthly)}</p>
            <p className="text-sm text-gray-500 mt-2">
              {formatCurrency(totalMonthly / 30)} per day
            </p>
          </div>

          <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-gray-700 text-lg font-medium">Yearly Expense</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalYearly)}</p>
            <p className="text-sm text-gray-500 mt-2">
              {formatCurrency(totalYearly / 12)} per month
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscriptions List */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Active Subscriptions
                </h2>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${period === 'monthly' ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setPeriod('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${period === 'yearly' ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setPeriod('yearly')}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : activeSubscriptions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {activeSubscriptions.map((subscription) => (
                    <div key={subscription._id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {subscription.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-4 text-left">
                          <h3 className="text-lg font-medium text-gray-800">{subscription.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{subscription.category} • {subscription.frequency}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-6">
                          <p className="text-lg font-medium text-gray-800">
                            {formatCurrency(subscription.price)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Next renewal: {formatDate(subscription.renewalDate)}
                          </p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No active subscriptions found.</p>
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Category Breakdown
              </h2>

              {categoryData.length > 0 ? (
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-gray-700 capitalize font-medium">{category.name}</div>
                        <div className="text-gray-700 font-medium">{formatCurrency(category.total)}</div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${(category.total / totalMonthly) * 100}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-400 to-purple-500"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No category data available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Upcoming Renewals */}
            <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <CalendarDays className="text-purple-500 mr-2" size={20} />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Upcoming Renewals
                </h2>
              </div>

              {upcomingRenewals.length > 0 ? (
                <div className="space-y-4">
                  {upcomingRenewals.map((subscription) => (
                    <div key={subscription._id} className="flex items-center bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {subscription.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-3 flex-grow">
                        <h3 className="text-sm font-medium text-gray-800">{subscription.name}</h3>
                        <p className="text-xs text-gray-500">{formatDate(subscription.renewalDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">
                          {formatCurrency(subscription.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-center">
                  <div>
                    <AlertCircle className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-gray-500">No upcoming renewals</p>
                  </div>
                </div>
              )}
            </div>

            {/* Expired Subscriptions */}
            <div className="bg-white bg-opacity-70 rounded-2xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <Tag className="text-pink-500 mr-2" size={20} />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Expired Subscriptions
                </h2>
              </div>

              {expiredSubscriptions.length > 0 ? (
                <div className="space-y-3">
                  {expiredSubscriptions.map((subscription) => (
                    <div key={subscription._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {subscription.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-700">{subscription.name}</h3>
                          <p className="text-xs text-gray-500">Expired: {formatDate(subscription.renewalDate)}</p>
                        </div>
                      </div>
                      <button className="text-xs text-purple-600 font-medium">Renew</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-gray-500">No expired subscriptions</p>
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-2xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Subscription Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Active Subscriptions:</span>
                  <span className="font-medium">{activeSubscriptions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Spend:</span>
                  <span className="font-medium">{formatCurrency(totalMonthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yearly Spend:</span>
                  <span className="font-medium">{formatCurrency(totalYearly)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Upcoming Renewals:</span>
                  <span className="font-medium">{upcomingRenewals.length}</span>
                </div>
                <div className="border-t border-white border-opacity-20 my-2 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Average Monthly:</span>
                    <span>{formatCurrency(totalYearly / 12)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}