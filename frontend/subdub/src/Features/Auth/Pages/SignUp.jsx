import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router';
import GetSignUp from '../Services/SignUp'

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // Simulate the cursor effect
    useState(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const cursorStyle = {
        background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255, 182, 255, 0.15), transparent 40%)`,
    };

    const handleSignUp = async () => {
        // Validate inputs
        if (!firstName || !lastName || !email || !password ) {
            setError('All fields are required');
            return;
        }

        // if (password !== confirmPassword) {
        //     setError('Passwords do not match');
        //     return;
        // }

        setLoading(true);
        setError('');

        // Simulate API call
        try {
            const name =  firstName + " " + lastName;
            const response = await GetSignUp(name, email, password);
            if(response.data.token != null && response.data.user != null){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/dashboard");
            }
            
        } catch (err) {
            setError('An error occurred during sign up. Please try again.');
        } finally {
            setLoading(false);
        }
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

            {/* Left panel - Signup form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <div className="backdrop-blur-lg bg-white bg-opacity-70 border border-gray-100 shadow-2xl rounded-3xl max-w-lg w-full p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-pink-100 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 bg-blue-100 rounded-full -ml-12 -mb-12"></div>

                    <div className="mb-8 relative">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-16 w-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                                <User className="text-white transform -rotate-12" size={28} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Create Account</h1>
                        <p className="text-gray-500 mt-2 text-center">Join our subscription management platform</p>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">First Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-pink-400 group-hover:text-purple-500 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-70 backdrop-blur-sm border-2 border-purple-100 rounded-2xl outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-gray-700"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">Last Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-pink-400 group-hover:text-purple-500 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-70 backdrop-blur-sm border-2 border-purple-100 rounded-2xl outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-gray-700"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

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
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">Password</label>
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

                        {/* <div className="relative group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-pink-400 group-hover:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-70 backdrop-blur-sm border-2 border-purple-100 rounded-2xl outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-gray-700"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} className="text-pink-400 hover:text-purple-500 transition-colors duration-300" />
                                    ) : (
                                        <Eye size={18} className="text-pink-400 hover:text-purple-500 transition-colors duration-300" />
                                    )}
                                </button>
                            </div>
                        </div> */}

                        {/* <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-5 w-5 text-pink-500 border-2 border-purple-100 rounded-md focus:ring-pink-200 cursor-pointer"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                                I agree to the <a href="#" className="text-pink-500 hover:text-purple-600 font-medium">Terms of Service</a> and <a href="#" className="text-pink-500 hover:text-purple-600 font-medium">Privacy Policy</a>
                            </label>
                        </div> */}

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-center border border-red-100">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSignUp}
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
                                    <span className="relative z-10">Creating Account...</span>
                                </>
                            ) : (
                                <span className="relative z-10">Sign Up</span>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a onClick={()=>navigate("/sign-in")} className="text-pink-500 hover:text-purple-600 font-medium transition-colors duration-300 hover:cursor-pointer">
                            Log in
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
                        <p className="uppercase text-sm font-medium tracking-widest text-purple-600">Free 30-Day Trial</p>
                    </div>

                    <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">Start Managing Your <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Subscriptions</span></h2>

                    <div className="mb-12">
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Join thousands of users who save money and time by tracking their subscriptions in one place. No credit card required to get started.
                        </p>

                        <div className="space-y-4">
                            {[
                                'Track all your subscriptions in one dashboard',
                                'Get reminders before payment due dates',
                                'Analyze spending habits with visual reports',
                                'Cancel unwanted subscriptions with one click'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center mr-3 flex-shrink-0">
                                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(num => (
                                <div key={num} className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                                    {['JD', 'MK', 'AL', 'TS'][num-1]}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                            <span className="font-medium text-purple-600">2,500+</span> users joined this month
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}