import Hero from '../components/Hero';

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
                            <p className="text-gray-600">Browse our collection of beautifully designed hanging decorations and charms.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-white border border-[var(--color-brand-border)] rounded-2xl flex items-center justify-center text-2xl font-bold text-[var(--color-brand-accent)] shadow-sm mb-6">2</div>
                            <h3 className="text-2xl font-semibold mb-3">Enable it</h3>
                            <p className="text-gray-600">Click enable to configure the decoration to match your personal preferences.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-white border border-[var(--color-brand-border)] rounded-2xl flex items-center justify-center text-2xl font-bold text-[var(--color-brand-accent)] shadow-sm mb-6">3</div>
                            <h3 className="text-2xl font-semibold mb-3">Enjoy it</h3>
                            <p className="text-gray-600">Watch the charm physically hang from the top edge of your Windows desktop.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;