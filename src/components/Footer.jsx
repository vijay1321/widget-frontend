const Footer = () => {
    return (
        <footer className="bg-white border-t border-[var(--color-brand-border)] py-10 mt-20">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Widgetly. All rights reserved.</p>
                <p className="text-sm mt-2">Your desktop. Your style.</p>
            </div>
        </footer>
    );
};

export default Footer;