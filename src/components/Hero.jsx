import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-[var(--color-brand-dark)] tracking-tight mb-6">
                    Beautiful Hanging <br /> <span className="text-[var(--color-brand-accent)]">Decorations</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Customize your Windows desktop with elegant hanging charms and decorations. Bring life to your screen without the clutter.
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

export default Hero;