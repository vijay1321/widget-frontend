const fs = require('fs');
const path = require('path');

const dirs = [
    'src/components',
    'src/pages',
    'src/context',
    'src/utils'
];

dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const files = {
    'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`,

    'src/index.css': `@import "tailwindcss";

@theme {
  --color-brand-cream: #fbfbf9;
  --color-brand-light: #f4f2ee;
  --color-brand-accent: #e5a952;
  --color-brand-dark: #33312e;
  --color-brand-border: #e8e6e1;
}

body {
  background-color: var(--color-brand-cream);
  color: var(--color-brand-dark);
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--color-brand-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}`,

    'src/main.jsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)`,

    'src/App.jsx': `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Widgets from './pages/Widgets';
import Dashboard from './pages/Dashboard';
import WindowsApp from './pages/WindowsApp';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/windows-app" element={<WindowsApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;`,

    '.env': `VITE_WINDOWS_DOWNLOAD_URL=https://example.com/widgetly-setup.exe`,

    '.env.example': `VITE_WINDOWS_DOWNLOAD_URL=https://example.com/widgetly-setup.exe`,

    'src/utils/api.js': `import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
});

export default api;`,

    'src/context/AuthContext.jsx': `import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
    };

    const register = async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};`
};

for (const [filepath, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(process.cwd(), filepath), content);
}

console.log('Frontend base files scaffolded successfully!');
