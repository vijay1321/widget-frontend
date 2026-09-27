import { Download, Monitor, Zap, Layout } from 'lucide-react';

const WindowsApp = () => {
    const downloadUrl = import.meta.env.VITE_WINDOWS_DOWNLOAD_URL || '#';

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-brand-dark)] mb-6">Bring Your Widgets <br/> to Windows</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Install the Windows companion app once and magically control all your desktop widgets directly from this website.
                </p>
                <a 
                    href={downloadUrl}
                    className="inline-flex items-center space-x-3 bg-[var(--color-brand-dark)] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition-colors shadow-lg"
                >
                    <Download size={24} />
                    <span>Download for Windows</span>
                </a>
                <p className="mt-4 text-sm text-gray-400">Version 1.0.0 • 45MB • Requires Windows 10/11</p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[var(--color-brand-border)] shadow-sm mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-transparent to-[var(--color-brand-light)] rounded-bl-full opacity-50"></div>
                
                <h3 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-8">Why install the companion app?</h3>
                
                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    <div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Monitor size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Native Experience</h4>
                        <p className="text-gray-600">Widgets render beautifully on your desktop, perfectly blending with your wallpaper and system theme.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-yellow-50 text-[var(--color-brand-accent)] rounded-xl flex items-center justify-center mb-4">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Remote Sync</h4>
                        <p className="text-gray-600">Enable or disable widgets on the web, and they instantly appear or disappear on your desktop.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Layout size={24} />
                        </div>
                        <h4 className="text-lg font-bold mb-2">Low Resource</h4>
                        <p className="text-gray-600">Built with modern technologies to ensure your computer remains fast and battery efficient.</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Coming soon</h3>
                <p className="text-gray-600">macOS and Linux support are currently in development.</p>
            </div>
        </div>
    );
};

export default WindowsApp;