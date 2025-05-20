import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, BellRing, CreditCard, Settings, Sparkles, Activity } from "lucide-react";
import GetLogin from '../Services/Login.js' 
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await GetLogin(email, password);
            if(response.data.token != null && response.data.user != null){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/dashboard");
            }
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Features showcase items
    const features = [
        { icon: <BellRing size={16} />, text: "Renewal alerts" },
        { icon: <CreditCard size={16} />, text: "Spending insights" },
        { icon: <Settings size={16} />, text: "Cancellation tools" },
        { icon: <Sparkles size={16} />, text: "Smart budgeting" },
        { icon: <Activity size={16} />, text: "Usage analytics" },
    ];

    const cursorStyle = {
        background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(250, 223, 255, 0.15), transparent 80%)`,
    };

    return (
        <div className="min-h-screen flex bg-white overflow-hidden relative">
            {mounted && (
                <div
                    className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
                    style={cursorStyle}
                />
            )}

            {/* Abstract shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-200 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-200 blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-blue-200 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-yellow-200 blur-3xl"></div>
            </div>

            {/* Left panel - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <div className="backdrop-blur-lg bg-white bg-opacity-70 border border-gray-100 shadow-2xl rounded-3xl max-w-md w-full p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-pink-100 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 bg-blue-100 rounded-full -ml-12 -mb-12"></div>

                    <div className="mb-8 relative">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-16 w-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                                <CreditCard className="text-white transform -rotate-12" size={28} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Welcome Back</h1>
                        <p className="text-gray-500 mt-2 text-center">Access your subscription universe</p>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="relative group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-pink-400 group-hover:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-70 backdrop-blur-sm border-2 border-purple-100 rounded-2xl outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-gray-700"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700 ml-2">Password</label>
                                <a href="#" className="text-xs text-pink-500 hover:text-purple-600 transition-colors duration-300">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-pink-400 group-hover:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-70 backdrop-blur-sm border-2 border-purple-100 rounded-2xl outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-gray-700"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} className="text-pink-400 hover:text-purple-500 transition-colors duration-300" />
                                    ) : (
                                        <Eye size={18} className="text-pink-400 hover:text-purple-500 transition-colors duration-300" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-center border border-red-100">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 text-white rounded-2xl font-medium shadow-lg shadow-purple-200 transform hover:-translate-y-1 flex items-center justify-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 w-full h-full transition duration-300 scale-x-0 transform bg-white/30 group-hover:scale-x-100 origin-left"></div>
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="relative z-10">Logging in...</span>
                                </>
                            ) : (
                                <span className="relative z-10">Log In</span>
                            )}
                        </button>

                        {/* <div className="relative flex items-center justify-center my-6">
                            <div className="border-t border-purple-100 w-full"></div>
                            <div className="bg-white px-4 text-sm text-gray-400 w-full">or continue with</div>
                            <div className="border-t border-purple-100 w-full"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="py-3 px-4 bg-white hover:bg-gray-50 border-2 border-purple-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-md group"
                            >
                                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                className="py-3 px-4 bg-white hover:bg-gray-50 border-2 border-purple-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-md group"
                            >
                                <svg className="w-5 h-5 mr-2 text-blue-600 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                                <span className="text-gray-700">Facebook</span>
                            </button>
                        </div> */}
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a onClick={()=>navigate("/sign-up")} className="text-pink-500 hover:text-purple-600 font-medium transition-colors duration-300 hover:cursor-pointer">
                            Sign up for free
                        </a>
                    </div>
                </div>
            </div>

            {/* Right panel - Feature showcase */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-12 items-center justify-center relative">
                <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(81, 56, 238, 0.05)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mr-4"></div>
                        <p className="uppercase text-sm font-medium tracking-widest text-purple-600">Subscription Manager</p>
                    </div>

                    <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">Take Control of Your Digital <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Subscriptions</span></h2>

                    <div className="mb-12">
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Never miss another payment or overpay for unused services. Our award-winning platform helps you visualize, optimize, an
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;