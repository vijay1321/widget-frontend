import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({ isOpen, onClose, title, message, onConfirm, confirmText = "Confirm", isSuccess = false }) => {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-[var(--color-brand-dark)]">{title}</h2>
                        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <p className="text-gray-600 mb-8">{message}</p>
                    
                    <div className="flex space-x-4">
                        {isSuccess ? (
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-[var(--color-brand-dark)] text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
                            >
                                Got it
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={onClose}
                                    className="flex-1 bg-gray-100 text-[var(--color-brand-dark)] py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        if(onConfirm) {
                                            onConfirm();
                                        } else {
                                            navigate('/windows-app');
                                            onClose();
                                        }
                                    }}
                                    className="flex-1 bg-[var(--color-brand-dark)] text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
                                >
                                    {confirmText}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;