// API Configuration for different environments and developers
const API_CONFIG = {
  // Development with individual databases
  dev: {
    juen: {
      backend: 'http://localhost:8080',
      frontend: 'http://localhost:5173'
    },
    ricablanca: {
      backend: 'http://localhost:8081', 
      frontend: 'http://localhost:5174'
    },
    vestil: {
      backend: 'http://localhost:8082',
      frontend: 'http://localhost:5175'
    }
  },
  
  // Shared database for customer testing
  shared: {
    juen: {
      backend: 'http://localhost:8080',
      frontend: 'http://localhost:5173'
    },
    ricablanca: {
      backend: 'http://localhost:8081',
      frontend: 'http://localhost:5174'
    },
    vestil: {
      backend: 'http://localhost:8082', 
      frontend: 'http://localhost:5175'
    }
  },
  
  // Production
  prod: {
    backend: 'http://localhost:8080',
    frontend: 'http://localhost:5173'
  }
};

// Get current environment from URL or localStorage
export const getCurrentEnvironment = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const env = urlParams.get('env') || localStorage.getItem('env') || 'dev';
  return env;
};

// Get current developer from URL or localStorage
export const getCurrentDeveloper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dev = urlParams.get('dev') || localStorage.getItem('dev') || 'juen';
  return dev;
};

// Get API base URL
export const getApiBaseUrl = () => {
  const env = getCurrentEnvironment();
  const dev = getCurrentDeveloper();
  
  if (env === 'prod') {
    return API_CONFIG.prod.backend;
  }
  
  return API_CONFIG[env][dev].backend;
};

// Get frontend base URL
export const getFrontendBaseUrl = () => {
  const env = getCurrentEnvironment();
  const dev = getCurrentDeveloper();
  
  if (env === 'prod') {
    return API_CONFIG.prod.frontend;
  }
  
  return API_CONFIG[env][dev].frontend;
};

// Set environment
export const setEnvironment = (env) => {
  localStorage.setItem('env', env);
  window.location.reload();
};

// Set developer
export const setDeveloper = (dev) => {
  localStorage.setItem('dev', dev);
  window.location.reload();
};

// Get current configuration
export const getCurrentConfig = () => {
  const env = getCurrentEnvironment();
  const dev = getCurrentDeveloper();
  
  if (env === 'prod') {
    return API_CONFIG.prod;
  }
  
  return API_CONFIG[env][dev];
};

// Update user info
export const updateUserInfo = async (userId, data) => {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/auth/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user info');
  return res.json();
};

export default API_CONFIG; 