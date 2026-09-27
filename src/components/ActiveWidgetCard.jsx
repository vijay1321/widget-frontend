const ActiveWidgetCard = ({ userWidget, onDisable }) => {
    const { widgetId: widget, status, expiresAt } = userWidget;
    const daysLeft = Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
    
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-brand-border)] flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-[var(--color-brand-light)] rounded-2xl flex items-center justify-center text-2xl">
                    ✨
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[var(--color-brand-dark)]">{widget.name}</h3>
                    <div className="flex items-center space-x-3 mt-1 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium text-xs">
                            {status}
                        </span>
                        <span className="text-gray-500">
                            Expires: {new Date(expiresAt).toLocaleDateString()} ({daysLeft > 0 ? `${daysLeft} days left` : 'Expired'})
                        </span>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => onDisable(widget._id)}
                className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors"
            >
                Disable
            </button>
        </div>
    );
};

export default ActiveWidgetCard;