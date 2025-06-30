import './styles/App.css';    

// For home page
// import HomePage from './pages/HomePage';

// function App() {
//   return <HomePage />;
// }

// export default App; 


import AddProductPage from './pages/Admin/AddProductPage';
import EditProductPage from './pages/Admin/EditProductPage';
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { getCurrentEnvironment, getCurrentDeveloper, setEnvironment, setDeveloper } from './config/api';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [productId, setProductId] = useState(null);
  const [currentEnv, setCurrentEnv] = useState('dev');
  const [currentDev, setCurrentDev] = useState('juen');

  useEffect(() => {
    // Check URL parameters for different pages
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const page = urlParams.get('page');
    const env = urlParams.get('env');
    const dev = urlParams.get('dev');
    
    if (editId) {
      setCurrentPage('edit');
      setProductId(editId);
    } else if (page === 'add') {
      setCurrentPage('add');
      setProductId(null);
    } else {
      setCurrentPage('dashboard');
      setProductId(null);
    }

    // Set environment and developer
    if (env) {
      setCurrentEnv(env);
    } else {
      setCurrentEnv(getCurrentEnvironment());
    }

    if (dev) {
      setCurrentDev(dev);
    } else {
      setCurrentDev(getCurrentDeveloper());
    }
  }, []);

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    setProductId(null);
    window.history.pushState({}, '', '/');
  };

  const navigateToAdd = () => {
    setCurrentPage('add');
    setProductId(null);
    window.history.pushState({}, '', '/?page=add');
  };

  const navigateToEdit = (id) => {
    setCurrentPage('edit');
    setProductId(id);
    window.history.pushState({}, '', `/?edit=${id}`);
  };

  const handleEnvironmentChange = (env) => {
    setEnvironment(env);
    setCurrentEnv(env);
  };

  const handleDeveloperChange = (dev) => {
    setDeveloper(dev);
    setCurrentDev(dev);
  };

  // Navigation functions for different pages
  const dashboardNavigation = {
    onAddProduct: navigateToAdd,
    onEditProduct: navigateToEdit
  };

  const addProductNavigation = {
    onNavigate: navigateToDashboard
  };

  const editProductNavigation = {
    onNavigate: navigateToDashboard
  };

  // Environment switcher component
  const EnvironmentSwitcher = () => (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontSize: '12px'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <strong>Environment:</strong>
        <select 
          value={currentEnv} 
          onChange={(e) => handleEnvironmentChange(e.target.value)}
          style={{ marginLeft: '5px', padding: '2px' }}
        >
          <option value="dev">Individual DB</option>
          <option value="shared">Shared DB</option>
          <option value="prod">Production</option>
        </select>
      </div>
      <div>
        <strong>Developer:</strong>
        <select 
          value={currentDev} 
          onChange={(e) => handleDeveloperChange(e.target.value)}
          style={{ marginLeft: '5px', padding: '2px' }}
        >
          <option value="juen">Juen (8080)</option>
          <option value="ricablanca">Ricablanca (8081)</option>
          <option value="vestil">Vestil (8082)</option>
        </select>
      </div>
      <div style={{ 
        marginTop: '5px', 
        padding: '3px 6px', 
        background: currentEnv === 'shared' ? '#dcfce7' : '#fef3c7',
        borderRadius: '3px',
        fontSize: '10px'
      }}>
        {currentEnv === 'shared' ? '✅ Shared Products' : '🔧 Individual DB'}
      </div>
    </div>
  );

  // Render the appropriate page based on current state
  if (currentPage === 'edit' && productId) {
    return (
      <>
        <EnvironmentSwitcher />
        <EditProductPage productId={productId} onNavigate={navigateToDashboard} />
      </>
    );
  }

  if (currentPage === 'add') {
    return (
      <>
        <EnvironmentSwitcher />
        <AddProductPage onNavigate={navigateToDashboard} />
      </>
    );
  }

  return (
    <>
      <EnvironmentSwitcher />
      <AdminDashboard onNavigate={dashboardNavigation} />
    </>
  );
}

export default App; 

// For Product Page

// import ProductPage from './pages/ProductPage';
//    function App() {
//      return <ProductPage />;
//    }
//    export default App;