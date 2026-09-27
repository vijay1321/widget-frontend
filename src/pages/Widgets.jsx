import { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';
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
        const fetchWidgets = async () => {
            try {
                const res = await apiClient.get('/widgets');
                let allWidgets = res.data;
                if (localStorage.getItem('token')) {
                    try {
                        const userRes = await apiClient.get('/user/widgets');
                        const userMap = {};
                        userRes.data.forEach(uw => {
                            if (uw.widgetId) userMap[uw.widgetId._id] = uw.status;
                        });
                        allWidgets = allWidgets.map(w => ({ ...w, userStatus: userMap[w._id] || 'Disabled' }));
                    } catch (e) { console.error('Error fetching user widgets', e); }
                }
                setWidgets(allWidgets);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWidgets();
    }, []);

    const handlePreview = (widget) => {
        setSelectedWidget(widget);
        setShowPreview(true);
    };

    const handleEnable = async (widget) => {
        try {
            await apiClient.post(`/widgets/${widget._id}/enable`);
            setWidgets(prev => prev.map(w => w._id === widget._id ? { ...w, userStatus: 'Enabled' } : w));
            setConfirmModal({
                isOpen: true,
                title: 'Enabled',
                message: "Your decoration is now active on your desktop. If you haven't installed the Windows app yet, download it now to see the decoration.",
                isSuccess: true
            });
        } catch (error) {
            if (error.response?.status === 401) {
                setConfirmModal({
                    isOpen: true,
                    title: 'Login Required',
                    message: 'Please login or create an account to enable decorations.',
                    isSuccess: false,
                    confirmText: 'Login',
                    onConfirm: () => window.location.href = '/login'
                });
            } else {
                setConfirmModal({
                    isOpen: true,
                    title: 'Enable Desktop Decoration',
                    message: 'Install the Windows app once to display this decoration directly on your desktop.',
                    isSuccess: false,
                    confirmText: 'Download for Windows',
                    onConfirm: null // null routes to /windows-app inside the modal
                });
            }
        }
    };

    const handleDisable = async (widget) => {
        try {
            await apiClient.post(`/widgets/${widget._id}/disable`);
            setWidgets(prev => prev.map(w => w._id === widget._id ? { ...w, userStatus: 'Disabled' } : w));
        } catch (error) { console.error(error); }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-[var(--color-brand-dark)] mb-4">Decoration Gallery</h1>
                <p className="text-gray-600 text-lg">Browse our collection of beautiful hanging charms. Enable them here and watch them appear physically hanging from your Windows desktop.</p>
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
                            onDisable={handleDisable}
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

export default Widgets;