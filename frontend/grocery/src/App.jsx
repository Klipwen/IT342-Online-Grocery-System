import './styles/App.css';
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddProductPage from './pages/Admin/AddProductPage';
import EditProductPage from './pages/Admin/EditProductPage';
import RegisterPage from './pages/RegisterPage'; // Ricablanca's page
import LoginPage from './pages/LoginPage'; // If you have a login page
import ProtectedRoute from './components/ProtectedRoute';
import { getCurrentEnvironment, getCurrentDeveloper, setEnvironment, setDeveloper } from './config/api';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import sardinesImg from './assets/sardines_product.png';
import AboutUsPage from './pages/AboutUsPage';
import Error404Page from './pages/Error404Page';
import AdminUserPage from './pages/Admin/AdminUserPage';
import { fetchCart, addOrUpdateCartItem, removeCartItem, clearCart } from './utils/cartApi';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [productId, setProductId] = useState(null);
  const [currentEnv, setCurrentEnv] = useState('dev');
  const [currentDev, setCurrentDev] = useState('juen');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [cart, setCart] = useState([]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (user && user.id) {
      fetchCart(user.id)
        .then(cartItems => setCart(cartItems))
        .catch(() => setCart([]));
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const page = urlParams.get('page');
    const env = urlParams.get('env');
    const dev = urlParams.get('dev');
    const route = urlParams.get('route');
    const productIdParam = urlParams.get('id');

    if (route === 'register') {
      setCurrentPage('register');
      return;
    }
    if (route === 'login') {
      setCurrentPage('login');
      return;
    }
    if (route === 'admin') {
      setCurrentPage('admin');
      return;
    }
    if (route === 'home') {
      setCurrentPage('home');
      return;
    }
    if (route === 'product' && productIdParam) {
      setProductId(productIdParam);
      setCurrentPage('product');
      return;
    }
    if (route === 'cart') {
      setCurrentPage('cart');
      return;
    }
    if (route === 'aboutus') {
      setCurrentPage('aboutus');
      return;
    }
    if (route === 'error404') {
      setCurrentPage('error404');
      return;
    }
    if (route === 'users') {
      setCurrentPage('users');
      return;
    }

    // If no route is specified, redirect to login
    window.location.href = '/?route=login';
  }, []);

  // Cart handlers using backend
  const handleAddToCart = async (productId, quantity) => {
    if (!user) return;
    await addOrUpdateCartItem(user.id, productId, quantity);
    const updatedCart = await fetchCart(user.id);
    setCart(updatedCart);
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user) return;
    await removeCartItem(user.id, productId);
    const updatedCart = await fetchCart(user.id);
    setCart(updatedCart);
  };

  const handleClearCart = async () => {
    if (!user) return;
    await clearCart(user.id);
    setCart([]);
  };

  const navigateToDashboard = () => {
    setCurrentPage('admin');
    setProductId(null);
    window.history.pushState({}, '', '/?route=admin');
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

  const dashboardNavigation = {
    onAddProduct: navigateToAdd,
    onEditProduct: navigateToEdit
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    // ...other logout logic
  };

  // const EnvironmentSwitcher = () => (
  //   <div style={{
  //     position: 'fixed',
  //     top: '10px',
  //     right: '10px',
  //     background: 'white',
  //     padding: '10px',
  //     borderRadius: '8px',
  //     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  //     zIndex: 1000,
  //     fontSize: '12px'
  //   }}>
  //     <div style={{ marginBottom: '8px' }}>
  //       <strong>Environment:</strong>
  //       <select 
  //         value={currentEnv} 
  //         onChange={(e) => handleEnvironmentChange(e.target.value)}
  //         style={{ marginLeft: '5px', padding: '2px' }}
  //       >
  //         <option value="dev">Individual DB</option>
  //         <option value="shared">Shared DB</option>
  //         <option value="prod">Production</option>
  //       </select>
  //     </div>
  //     <div>
  //       <strong>Developer:</strong>
  //       <select 
  //         value={currentDev} 
  //         onChange={(e) => handleDeveloperChange(e.target.value)}
  //         style={{ marginLeft: '5px', padding: '2px' }}
  //       >
  //         <option value="juen">Juen (8080)</option>
  //         <option value="ricablanca">Ricablanca (8080)</option>
  //         <option value="vestil">Vestil (8082)</option>
  //       </select>
  //     </div>
  //     <div style={{ 
  //       marginTop: '5px', 
  //       padding: '3px 6px', 
  //       background: currentEnv === 'shared' ? '#dcfce7' : '#fef3c7',
  //       borderRadius: '3px',
  //       fontSize: '10px'
  //     }}>
  //       {currentEnv === 'shared' ? '✅ Shared Products' : '🔧 Individual DB'}
  //     </div>
  //   </div>
  // );

  // Routing logic
  if (currentPage === 'register') {
    return <RegisterPage />;
  }
  if (currentPage === 'login') {
    return <LoginPage />;
  }
  if (currentPage === 'admin') {
    return (
      <>
        {/* <EnvironmentSwitcher /> */}
        <AdminDashboard onNavigate={dashboardNavigation} />
      </>
    );
  }
  if (currentPage === 'edit' && productId) {
    return (
      <>
        {/* <EnvironmentSwitcher /> */}
        <EditProductPage productId={productId} onNavigate={navigateToDashboard} />
      </>
    );
  }
  if (currentPage === 'add') {
    return (
      <>
        {/* <EnvironmentSwitcher /> */}
        <AddProductPage onNavigate={navigateToDashboard} />
      </>
    );
  }
  if (currentPage === 'home') {
    return <HomePage cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />;
  }
  if (currentPage === 'product' && productId) {
    return <ProductPage cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />;
  }
  if (currentPage === 'cart') {
    return <CartPage cart={cart} setCart={setCart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} user={user} />;
  }
  if (currentPage === 'aboutus') {
    return <AboutUsPage />;
  }
  if (currentPage === 'error404') {
    return <Error404Page />;
  }
  if (currentPage === 'users') {
    return <AdminUserPage onBack={navigateToDashboard} />;
  }
  // Default: page
  return <Error404Page />;
}

export default App;