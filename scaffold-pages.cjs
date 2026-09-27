const fs = require('fs');
const path = require('path');

const files = {
    'src/pages/Widgets.jsx': `import { useState, useEffect } from 'react';
import api from '../utils/api';
import WidgetCard from '../components/WidgetCard';
import WidgetPreviewModal from '../components/WidgetPreviewModal';
import ConfirmationModal from '../components/ConfirmationModal';

const Widgets = () => {
    const [widgets, setWidgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        isSuccess: false,
        confirmText: 'Download for Windows',
        onConfirm: null
    });

    useEffect(() => {
        api.get('/widgets')
            .then(res => setWidgets(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handlePreview = (widget) => {
        setSelectedWidget(widget);
        setShowPreview(true);
    };

    const handleEnable = async (widget) => {
        try {
            await api.post(\`/widgets/\${widget._id}/enable\`);
            setConfirmModal({
                isOpen: true,
                title: 'Widget Enabled Successfully',
                message: 'Your widget is ready. If you haven\\'t installed the Windows app yet, download it now to see the widget on your desktop.',
                isSuccess: true
            });
        } catch (error) {
            if (error.response?.status === 401) {
                setConfirmModal({
                    isOpen: true,
                    title: 'Login Required',
                    message: 'Please login or create an account to enable widgets.',
                    isSuccess: false,
                    confirmText: 'Login',
                    onConfirm: () => window.location.href = '/login'
                });
            } else {
                setConfirmModal({
                    isOpen: true,
                    title: 'Windows App Required',
                    message: 'Download the Windows app to use this widget on your desktop.',
                    isSuccess: false,
                    confirmText: 'Download for Windows',
                    onConfirm: null // null routes to /windows-app inside the modal
                });
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-[var(--color-brand-dark)] mb-4">Widget Gallery</h1>
                <p className="text-gray-600 text-lg">Browse our collection of beautiful widgets. Enable them here and watch them appear on your Windows desktop instantly.</p>
            </div>
            
            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-pulse flex space-x-4"><div className="rounded-full bg-gray-200 h-10 w-10"></div><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-gray-200 rounded"></div><div className="space-y-3"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-gray-200 rounded col-span-2"></div><div className="h-2 bg-gray-200 rounded col-span-1"></div></div><div className="h-2 bg-gray-200 rounded"></div></div></div></div></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {widgets.map(widget => (
                        <WidgetCard 
                            key={widget._id} 
                            widget={widget} 
                            onPreview={handlePreview}
                            onEnable={handleEnable}
                        />
                    ))}
                </div>
            )}

            <WidgetPreviewModal 
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                widget={selectedWidget}
                onEnable={handleEnable}
            />

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({...prev, isOpen: false}))}
                title={confirmModal.title}
                message={confirmModal.message}
                isSuccess={confirmModal.isSuccess}
                confirmText={confirmModal.confirmText}
                onConfirm={confirmModal.onConfirm}
            />
        </div>
    );
};

export default Widgets;`,

    'src/pages/Dashboard.jsx': `import { useState, useEffect, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import ActiveWidgetCard from '../components/ActiveWidgetCard';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [userWidgets, setUserWidgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchUserWidgets();
        }
    }, [user]);

    const fetchUserWidgets = async () => {
        try {
            const res = await api.get('/user/widgets');
            setUserWidgets(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDisable = async (widgetId) => {
        try {
            await api.post(\`/widgets/\${widgetId}/disable\`);
            fetchUserWidgets(); // Refresh
        } catch (error) {
            console.error(error);
        }
    };

    if (authLoading) return <div className="p-12 text-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    const activeWidgets = userWidgets.filter(uw => uw.status === 'Enabled');

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-white rounded-3xl p-8 border border-[var(--color-brand-border)] shadow-sm mb-12">
                <h1 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">Welcome back, {user.name}</h1>
                <p className="text-gray-600">Manage your desktop widgets and account settings.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-[var(--color-brand-cream)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Widgets</div>
                        <div className="text-4xl font-bold text-[var(--color-brand-dark)]">{activeWidgets.length}</div>
                    </div>
                    <div className="bg-[var(--color-brand-cream)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Windows App Status</div>
                        <div className="text-lg font-bold text-gray-700 flex items-center mt-2">
                            <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span> Not connected
                        </div>
                    </div>
                    <div className="bg-[var(--color-brand-cream)] p-6 rounded-2xl border border-[var(--color-brand-border)]">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Subscription</div>
                        <div className="text-lg font-bold text-[var(--color-brand-accent)] mt-2">Free Plan</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-brand-dark)]">Active Widgets</h2>
                <Link to="/widgets" className="text-[var(--color-brand-accent)] font-medium hover:underline">
                    Browse more widgets &rarr;
                </Link>
            </div>

            {loading ? (
                <div className="py-12 text-center text-gray-500">Loading widgets...</div>
            ) : activeWidgets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeWidgets.map(uw => (
                        <ActiveWidgetCard 
                            key={uw._id} 
                            userWidget={uw} 
                            onDisable={handleDisable}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-[var(--color-brand-border)] shadow-sm">
                    <div className="text-5xl mb-4">🏝️</div>
                    <h3 className="text-xl font-bold text-[var(--color-brand-dark)] mb-2">No active widgets</h3>
                    <p className="text-gray-600 mb-6">You haven't enabled any widgets yet. Head over to the gallery to get started.</p>
                    <Link to="/widgets" className="inline-block bg-[var(--color-brand-dark)] text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors">
                        Explore Widgets
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;`,

    'src/pages/WindowsApp.jsx': `import { Download, Monitor, Zap, Layout } from 'lucide-react';

const WindowsApp = () => {
    const downloadUrl = import.meta.env.VITE_WINDOWS_DOWNLOAD_URL || '#';

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-brand-dark)] mb-6">Bring Your Widgets <br/> to Windows</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Install the Windows companion app once and magically control all your desktop widgets directly from this website.
                </p>
                <a 
                    href={downloadUrl}
                    className="inline-flex items-center space-x-3 bg-[var(--color-brand-dark)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition-colors shadow-lg"
                >
                    <Download size={24} />
                    <span>Download for Windows</span>
                </a>
                <p className="mt-4 text-sm text-gray-400">Version 1.0.0 • 45MB • Requires Windows 10/11</p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[var(--color-brand-border)] shadow-sm mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-[var(--color-brand-light)] rounded-bl-full opacity-50"></div>
                
                <h3 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-8">Why install the companion app?</h3>
                
                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    <div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Monitor size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Native Experience</h4>
                        <p className="text-gray-600">Widgets render beautifully on your desktop, perfectly blending with your wallpaper and system theme.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-yellow-50 text-[var(--color-brand-accent)] rounded-xl flex items-center justify-center mb-4">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Remote Sync</h4>
                        <p className="text-gray-600">Enable or disable widgets on the web, and they instantly appear or disappear on your desktop.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Layout size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Low Resource</h4>
                        <p className="text-gray-600">Built with modern technologies to ensure your computer remains fast and battery efficient.</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Coming soon</h3>
                <p className="text-gray-600">macOS and Linux support are currently in development.</p>
            </div>
        </div>
    );
};

export default WindowsApp;`,

    'src/pages/Login.jsx': `import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white rounded-3xl p-8 border border-[var(--color-brand-border)] shadow-sm">
                <h2 className="text-3xl font-bold text-center text-[var(--color-brand-dark)] mb-8">Welcome Back</h2>
                
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[var(--color-brand-dark)] text-white py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-sm"
                    >
                        Sign In
                    </button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Don't have an account? <Link to="/register" className="text-[var(--color-brand-accent)] font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;`,

    'src/pages/Register.jsx': `import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white rounded-3xl p-8 border border-[var(--color-brand-border)] shadow-sm">
                <h2 className="text-3xl font-bold text-center text-[var(--color-brand-dark)] mb-8">Create Account</h2>
                
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[var(--color-brand-dark)] text-white py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-sm"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-[var(--color-brand-accent)] font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;`
};

for (const [filepath, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(process.cwd(), filepath), content);
}

console.log('Frontend pages scaffolded successfully!');
