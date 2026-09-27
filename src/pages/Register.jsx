import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-white rounded-3xl p-8 border border-[var(--color-brand-border)] shadow-sm">
                <h2 className="text-3xl font-bold text-center text-[var(--color-brand-dark)] mb-8">Create Account</h2>
                
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[var(--color-brand-dark)] text-white py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-sm"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-[var(--color-brand-accent)] font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;