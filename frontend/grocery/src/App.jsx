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

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    // Check URL parameters for different pages
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const page = urlParams.get('page');
    
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

  // Render the appropriate page based on current state
  if (currentPage === 'edit' && productId) {
    return <EditProductPage productId={productId} onNavigate={navigateToDashboard} />;
  }

  if (currentPage === 'add') {
    return <AddProductPage onNavigate={navigateToDashboard} />;
  }

  return <AdminDashboard onNavigate={dashboardNavigation} />;
}

export default App; 

// For Product Page

// import ProductPage from './pages/ProductPage';
//    function App() {
//      return <ProductPage />;
//    }
//    export default App;