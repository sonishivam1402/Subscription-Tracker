import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './Features/Auth/Pages/Login';
import SignUp from './Features/Auth/Pages/SignUp';
import Dashboard from './Features/Dashboard/Page/Dashboard';
import Navbar from './components/Navbar/Navbar';
import SubscriptionManager from './Features/Subscriptions/Pages/Subscriptions';

function App() {
  return (
    <div>

      <BrowserRouter>
 
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
 
        <Navbar />
 
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscriptions" element={<SubscriptionManager />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
