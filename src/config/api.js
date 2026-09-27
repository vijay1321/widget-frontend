// ============================================
// API BASE URL CONFIGURATION
// ============================================

// PRODUCTION BACKEND
const PRODUCTION_API_URL = "https://widget-backend-1-l4lw.onrender.com";

// LOCAL DEVELOPMENT BACKEND
const LOCAL_API_URL = "http://localhost:5000";

// ============================================
// SELECT ACTIVE BACKEND
// ============================================

// Use PRODUCTION for deployed frontend
// const API_BASE_URL = PRODUCTION_API_URL;

// For local testing, comment the above line and uncomment:
const API_BASE_URL = LOCAL_API_URL;

export default API_BASE_URL;
