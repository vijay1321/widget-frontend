const WidgetCard = ({ widget, onPreview, onEnable, onDisable }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-brand-border)] hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="bg-[var(--color-brand-light)] rounded-2xl h-48 mb-6 flex justify-center overflow-hidden relative">
                {widget.previewImage ? (
                    <img src={widget.previewImage} alt={widget.name} className="absolute top-0 w-32 h-auto object-contain" />
                ) : (
                    <div className="text-4xl mt-4">🎨</div>
                )}
            </div>
            <div className="flex-grow">
                <span className="text-xs font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider">{widget.category}</span>
                <h3 className="text-xl font-bold text-[var(--color-brand-dark)] mt-1 mb-2">{widget.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{widget.description}</p>
            </div>
            <div className="flex space-x-3 mt-auto">
                <button 
                    onClick={() => onPreview(widget)}
                    className="flex-1 bg-gray-100 text-[var(--color-brand-dark)] py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                    Preview
                </button>
                {widget.userStatus === 'Enabled' ? (
                    <button 
                        onClick={() => onDisable(widget)}
                        className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-medium hover:bg-red-600 transition-colors"
                    >
                        Disable
                    </button>
                ) : (
                    <button 
                        onClick={() => onEnable(widget)}
                        className="flex-1 bg-[var(--color-brand-dark)] text-white py-2.5 rounded-xl font-medium hover:bg-black transition-colors"
                    >
                        {widget.userStatus === 'Expired' ? 'Enable Again' : 'Enable'}
                    </button>
                )}
            </div>
            {widget.userStatus && (
                <div className="mt-4 text-center text-sm font-medium">
                    Status: <span className={widget.userStatus === 'Enabled' ? 'text-green-600' : (widget.userStatus === 'Expired' ? 'text-red-500' : 'text-gray-500')}>{widget.userStatus}</span>
                </div>
            )}
        </div>
    );
};

export default WidgetCard;