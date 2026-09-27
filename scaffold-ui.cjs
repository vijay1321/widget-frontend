const fs = require('fs');
const path = require('path');

const files = {
    'src/components/Navbar.jsx': `import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Download } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 glass-card px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-[var(--color-brand-dark)] tracking-tight">
                    Widgetly
                </Link>
                <div className="hidden md:flex items-center space-x-8 font-medium">
                    <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors">Home</Link>
                    <Link to="/widgets" className="hover:text-[var(--color-brand-accent)] transition-colors">Widgets</Link>
                    <Link to="/#how-it-works" className="hover:text-[var(--color-brand-accent)] transition-colors">How It Works</Link>
                    
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-[var(--color-brand-accent)] transition-colors">Dashboard</Link>
                            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-[var(--color-brand-accent)] transition-colors">Get Started</Link>
                    )}
                    
                    <Link to="/windows-app" className="flex items-center space-x-2 bg-[var(--color-brand-dark)] text-white px-5 py-2 rounded-full hover:bg-black transition-colors shadow-sm">
                        <Download size={18} />
                        <span>Download for Windows</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;`,

    'src/components/Footer.jsx': `const Footer = () => {
    return (
        <footer className="bg-white border-t border-[var(--color-brand-border)] py-10 mt-20">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Widgetly. All rights reserved.</p>
                <p className="text-sm mt-2">Your desktop. Your style.</p>
            </div>
        </footer>
    );
};

export default Footer;`,

    'src/components/Hero.jsx': `import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-[var(--color-brand-dark)] tracking-tight mb-6">
                    Beautiful Widgets <br /> <span className="text-[var(--color-brand-accent)]">for Your Desktop</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Customize your Windows desktop with simple, useful, and beautiful widgets. Elevate your workspace today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link to="/login" className="flex items-center space-x-2 bg-[var(--color-brand-accent)] text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                        <span>Get Started</span>
                        <ArrowRight size={20} />
                    </Link>
                    <Link to="/windows-app" className="flex items-center space-x-2 bg-white text-[var(--color-brand-dark)] border border-[var(--color-brand-border)] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={20} />
                        <span>Download for Windows</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;`,

    'src/components/WidgetCard.jsx': `const WidgetCard = ({ widget, onPreview, onEnable }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[var(--color-brand-border)] hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="bg-[var(--color-brand-light)] rounded-2xl h-40 mb-6 flex items-center justify-center overflow-hidden">
                <div className="text-4xl">🎨</div>
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
                <button 
                    onClick={() => onEnable(widget)}
                    className="flex-1 bg-[var(--color-brand-dark)] text-white py-2.5 rounded-xl font-medium hover:bg-black transition-colors"
                >
                    Enable
                </button>
            </div>
        </div>
    );
};

export default WidgetCard;`,

    'src/components/ActiveWidgetCard.jsx': `const ActiveWidgetCard = ({ userWidget, onDisable }) => {
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
                            Expires: {new Date(expiresAt).toLocaleDateString()} ({daysLeft > 0 ? \`\${daysLeft} days left\` : 'Expired'})
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

export default ActiveWidgetCard;`,

    'src/components/ConfirmationModal.jsx': `import { X } from 'lucide-react';
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

export default ConfirmationModal;`,

    'src/components/WidgetPreviewModal.jsx': `import { X, Check } from 'lucide-react';

const WidgetPreviewModal = ({ isOpen, onClose, widget, onEnable }) => {
    if (!isOpen || !widget) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="relative h-64 bg-[var(--color-brand-light)] flex items-center justify-center text-6xl">
                    🖼️
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-sm">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto">
                    <span className="text-sm font-semibold text-[var(--color-brand-accent)] uppercase tracking-wider">{widget.category}</span>
                    <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mt-2 mb-4">{widget.name}</h2>
                    <p className="text-gray-600 text-lg mb-8">{widget.description}</p>
                    
                    <div className="mb-8">
                        <h4 className="font-semibold text-[var(--color-brand-dark)] mb-4">Features</h4>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Clean, minimal aesthetic</li>
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Low resource usage</li>
                            <li className="flex items-center"><Check size={18} className="text-green-500 mr-3" /> Auto-updates dynamically</li>
                        </ul>
                    </div>

                    <button 
                        onClick={() => {
                            onClose();
                            onEnable(widget);
                        }}
                        className="w-full bg-[var(--color-brand-dark)] text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-lg"
                    >
                        Enable this Widget
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WidgetPreviewModal;`,

    'src/pages/Home.jsx': `import Hero from '../components/Hero';

const Home = () => {
    return (
        <div>
            <Hero />
            
            {/* Quotes Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div>
                        <p className="text-2xl lg:text-3xl font-medium text-gray-400 italic">"Your desktop. Your style."</p>
                    </div>
                    <div>
                        <p className="text-2xl lg:text-3xl font-medium text-gray-400 italic">"Small widgets. Better workflow."</p>
                    </div>
                    <div>
                        <p className="text-2xl lg:text-3xl font-medium text-gray-400 italic">"Make your desktop feel yours."</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-[var(--color-brand-dark)] mb-16">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-white border border-[var(--color-brand-border)] rounded-2xl flex items-center justify-center text-2xl font-bold text-[var(--color-brand-accent)] shadow-sm mb-6">1</div>
                            <h3 className="text-2xl font-semibold mb-3">Choose a widget</h3>
                            <p className="text-gray-600">Browse our collection of beautifully designed widgets tailored for productivity and lifestyle.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-white border border-[var(--color-brand-border)] rounded-2xl flex items-center justify-center text-2xl font-bold text-[var(--color-brand-accent)] shadow-sm mb-6">2</div>
                            <h3 className="text-2xl font-semibold mb-3">Enable it</h3>
                            <p className="text-gray-600">Click enable and configure the widget settings to match your personal preferences perfectly.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-white border border-[var(--color-brand-border)] rounded-2xl flex items-center justify-center text-2xl font-bold text-[var(--color-brand-accent)] shadow-sm mb-6">3</div>
                            <h3 className="text-2xl font-semibold mb-3">Enjoy it</h3>
                            <p className="text-gray-600">Watch the widget instantly appear on your Windows desktop through our lightweight companion app.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;`
};

for (const [filepath, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(process.cwd(), filepath), content);
}

console.log('Frontend UI components and Home page scaffolded successfully!');
