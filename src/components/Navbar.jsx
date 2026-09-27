import { Link, useNavigate } from 'react-router-dom';
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

export default Navbar;