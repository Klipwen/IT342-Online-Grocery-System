import './styles/App.css';
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
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
import AdminViewUsers from './pages/Admin/AdminViewUsers';
import ProductsPage from './pages/ProductsPage';
import { fetchCart, addOrUpdateCartItem, removeCartItem, clearCart } from './utils/cartApi';
import CheckoutPage from './pages/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage';
import UserOrdersPage from './pages/UserOrdersPage';
import ContactPage from './pages/ContactPage';
import DeliveryLoginPage from './pages/DeliveryLoginPage';
import DeliveryRegisterPage from './pages/DeliveryRegisterPage';
import DeliveryDashboard from './pages/DeliveryDashboard';
import AssignedDeliveries from './components/AssignedDeliveries';

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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    () => sessionStorage.getItem('isAdminAuthenticated') === 'true'
  );
  const ADMIN_PASSWORD = 'admin123'; // Change as needed
  const [routeKey, setRouteKey] = useState(0);

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
    const handleRoute = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const editId = urlParams.get('edit');
      const page = urlParams.get('page');
      const env = urlParams.get('env');
      const dev = urlParams.get('dev');
      const route = urlParams.get('route');
      const productIdParam = urlParams.get('id');

      if (route === 'register') {
        setCurrentPage('register');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'login') {
        setCurrentPage('login');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'admin') {
        setCurrentPage('admin');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'admin-login') {
        setCurrentPage('admin-login');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'home') {
        setCurrentPage('home');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'product' && productIdParam) {
        setProductId(productIdParam);
        setCurrentPage('product');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'cart') {
        setCurrentPage('cart');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'aboutus') {
        setCurrentPage('aboutus');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'error404') {
        setCurrentPage('error404');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'users') {
        setCurrentPage('users');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'products') {
        setCurrentPage('products');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'checkout') {
        setCurrentPage('checkout');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'profile') {
        setCurrentPage('profile');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'user-orders') {
        setCurrentPage('user-orders');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'contact') {
        setCurrentPage('contact');
        setRouteKey(k => k + 1);
        return;
      }
      if (route === 'delivery') {
        setCurrentPage('delivery-login');
        setRouteKey(k => k + 1);
        return;
      }

      if (route === 'delivery-dashboard') {
        setCurrentPage('delivery-dashboard');
        setRouteKey(k => k + 1);
        return;
      }

      // If no route is specified, redirect to login
      window.location.href = '/?route=login';
    };
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
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

  const handleAdminLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      // Navigate to admin dashboard after successful login
      setCurrentPage('admin');
      window.history.pushState({}, '', '/?route=admin');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', '/?route=home');
  };

  const handleUserProfileNavigation = (page) => {
    if (page === 'user-orders') {
      setCurrentPage('user-orders');
      window.history.pushState({}, '', '/?route=user-orders');
    }
  };

  const handleLogout = () => {
    // Check if it's an admin logout
    const isAdminLogout = isAdminAuthenticated;
    
    setUser(null);
    setCart([]);
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('user');
    
    // Redirect based on who is logging out
    if (isAdminLogout) {
      setCurrentPage('admin-login');
      window.history.pushState({}, '', '/?route=admin-login');
    } else {
      setCurrentPage('login');
      window.history.pushState({}, '', '/?route=login');
    }
  };

  // Routing logic
  if (currentPage === 'register') {
    return <RegisterPage />;
  }
  if (currentPage === 'login') {
    return <LoginPage />;
  }
  if (currentPage === 'admin-login') {
    return <AdminLoginPage onLogin={handleAdminLogin} onBackToHome={handleBackToHome} />;
  }
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage onLogin={handleAdminLogin} onBackToHome={handleBackToHome} />;
    }
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
    return (
      <ProtectedRoute>
        <HomePage cart={cart} setCart={setCart} onAddToCart={handleAddToCart} user={user} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'product' && productId) {
    return (
      <ProtectedRoute>
        <ProductPage cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'cart') {
    return (
      <ProtectedRoute>
        <CartPage cart={cart} setCart={setCart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} user={user} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'aboutus') {
    return <AboutUsPage cart={cart} />;
  }
  if (currentPage === 'error404') {
    return <Error404Page cart={cart} />;
  }
  if (currentPage === 'users') {
    return <AdminViewUsers onBack={navigateToDashboard} />;
  }
  if (currentPage === 'products') {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    return (
      <ProtectedRoute>
        <ProductsPage key={routeKey} cart={cart} setCart={setCart} selectedCategory={selectedCategory} onAddToCart={handleAddToCart} user={user} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'checkout') {
    return (
      <ProtectedRoute>
        <CheckoutPage cart={cart} setCart={setCart} onClearCart={handleClearCart} user={user} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'profile') {
    return (
      <ProtectedRoute>
        <UserProfilePage user={user} cart={cart} onNavigate={handleUserProfileNavigation} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'user-orders') {
    return (
      <ProtectedRoute>
        <UserOrdersPage user={user} cart={cart} />
      </ProtectedRoute>
    );
  }
  if (currentPage === 'contact') {
    return <ContactPage cart={cart} />;
  }
  if (currentPage === 'delivery-login') {
    return <DeliveryLoginPage />;
  }
  if (currentPage === 'delivery-register') {
    return <DeliveryRegisterPage />;
  }
  if (currentPage === 'delivery-dashboard') {
    return <DeliveryDashboard />;
  }
  // Default: page
  return <Error404Page />;
  if (currentPage === 'assigned-deliveries') {
    return <AssignedDeliveries deliveryPersonId={user?.id} />;
  }
}



export default App;