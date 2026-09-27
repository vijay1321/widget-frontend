import { useState, useRef } from 'react';
import { X, Check, ArrowLeftRight } from 'lucide-react';

const WidgetPreviewModal = ({ isOpen, onClose, widget, onEnable }) => {
    const [dragPos, setDragPos] = useState({ x: 0, isDragging: false, startX: 0, initialX: 0 });
    const containerRef = useRef(null);

    if (!isOpen || !widget) return null;

    const handleMouseDown = (e) => {
        setDragPos({
            x: dragPos.x,
            isDragging: true,
            startX: e.clientX,
            initialX: dragPos.x
        });
    };

    const handleMouseMove = (e) => {
        if (!dragPos.isDragging) return;
        const delta = e.clientX - dragPos.startX;
        let newX = dragPos.initialX + delta;
        if (containerRef.current) {
            // Very rough clamping for the modal preview
            const bounds = containerRef.current.getBoundingClientRect();
            const max = bounds.width - 128; // roughly 32w
            const min = -bounds.width + 128;
            if (newX > max/2) newX = max/2;
            if (newX < min/2) newX = min/2;
        }
        setDragPos(prev => ({ ...prev, x: newX }));
    };

    const handleMouseUp = () => {
        setDragPos(prev => ({ ...prev, isDragging: false }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                <div 
                    ref={containerRef}
                    className="relative h-64 md:h-auto md:w-3/5 bg-gradient-to-br from-blue-100 to-blue-300 flex items-start justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[var(--color-brand-border)]"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Fake Desktop Wallpaper area */}
                    {widget.previewImage ? (
                        <div 
                            className="absolute top-0 cursor-grab"
                            style={{ 
                                transform: `translateX(${dragPos.x}px)`, 
                                transition: dragPos.isDragging ? 'none' : 'transform 0.3s ease-out'
                            }}
                            onMouseDown={handleMouseDown}
                        >
                            <img 
                                src={widget.previewImage} 
                                alt={widget.name} 
                                className={`w-32 h-auto object-contain pointer-events-none transition-transform duration-75 ${dragPos.isDragging ? (dragPos.x > dragPos.initialX ? 'rotate-[-5deg]' : 'rotate-[5deg]') : 'rotate-0'}`} 
                            />
                        </div>
                    ) : (
                        <span className="mt-8 text-6xl">🖼️</span>
                    )}
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/40 font-semibold flex items-center space-x-2 pointer-events-none">
                        <ArrowLeftRight size={20} />
                        <span>Drag horizontally to position</span>
                    </div>
                    {/* Fake Taskbar */}
                    <div className="absolute bottom-0 w-full h-12 bg-white/40 backdrop-blur-md flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
                        <div className="w-8 h-8 bg-white/50 rounded-md"></div>
                        <div className="w-8 h-8 bg-white/50 rounded-md"></div>
                    </div>
                </div>
                <div className="p-8 overflow-y-auto md:w-2/5 relative">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm z-10">
                        <X size={20} />
                    </button>
                    <span className="text-sm font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider">{widget.category}</span>
                    <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mt-2 mb-4">{widget.name}</h2>
                    <p className="text-gray-600 text-lg mb-8">{widget.description}</p>
                    
                    <div className="mb-8">
                        <h4 className="font-semibold text-[var(--color-brand-dark)] mb-4">Features</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Frameless transparent design</li>
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Always on top</li>
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Realistic natural sway</li>
                        </ul>
                    </div>

                    <button 
                        onClick={() => {
                            onClose();
                            onEnable(widget);
                        }}
                        className="w-full bg-[var(--color-brand-dark)] text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-lg mt-auto"
                    >
                        Enable Decoration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WidgetPreviewModal;