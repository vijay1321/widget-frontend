// ===============================
// API CONFIGURATION
// ===============================

// Production backend
const PRODUCTION_API_URL = "https://widget-backend-1-l4lw.onrender.com";

// Local backend
const LOCAL_API_URL = "http://localhost:5000";

// Select which backend to use
// Production:
const API_BASE_URL = PRODUCTION_API_URL;

// For local development, comment the above line and uncomment this:
// const API_BASE_URL = LOCAL_API_URL;


// ===============================
// WINDOWS APP DOWNLOAD
// ===============================

const WINDOWS_DOWNLOAD_URL =
  "https://github.com/vijay1321/widget-app/releases/download/v1.0.0/Widgetly.Setup.1.0.0.exe";
  //https://github.com/vijay1321/widget-app/releases/download/v1.0.0/Widgetly.Setup.1.0.0.exe/


export {
  API_BASE_URL,
  WINDOWS_DOWNLOAD_URL
};
