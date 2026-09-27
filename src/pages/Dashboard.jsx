import { useState, useEffect, useContext } from 'react';
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
            await api.post(`/widgets/${widgetId}/disable`);
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

export default Dashboard;