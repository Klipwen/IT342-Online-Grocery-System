import React, { useState, useEffect } from 'react';
import { ShoppingCart, ClipboardList, Users as UsersIcon, CreditCard, Truck, TrendingUp, Package, DollarSign, MapPin } from 'lucide-react';
import AdminViewUsers from './AdminViewUsers';
import AdminViewProducts from './AdminViewProducts';
import AddDeliveryPersonPage from './AddDeliveryPersonPage';
import AdminViewDeliveryPersonnel from './AdminViewDeliveryPersonnel';
import PaymentsPage from './PaymentsPage';
import DeliveriesPage from './DeliveriesPage';
import OrdersPage from './OrdersPage';
import { getApiBaseUrl } from '../../config/api';

// Color tokens for easy reference
const COLORS = {
  primary: '#fff',
  primary1: '#222',
  secondary: '#f8fafc',
  secondary1: '#f1f5f9',
  text: '#1f2937',
  text1: '#6b7280',
  text2: '#888',
  button: '#ef4444',
  button1: '#2563eb',
  button2: '#10b981',
  secondary2: '#f59e42',
  hoverButton: '#dc2626',
  border: '#e2e8f0',
  cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
};

const AdminDashboard = ({ onNavigate }) => {
  const [showViewUsers, setShowViewUsers] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showAddDelivery, setShowAddDelivery] = useState(false);
  const [showManageDelivery, setShowManageDelivery] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showDeliveries, setShowDeliveries] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [productCount, setProductCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [paymentCount, setPaymentCount] = useState(null);
  const [deliveryCount, setDeliveryCount] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [loadingDeliveries, setLoadingDeliveries] = useState(true);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [loadingDeliveryPersonnel, setLoadingDeliveryPersonnel] = useState(true);
  // Placeholder count for orders
  const orderCount = 2650;

  useEffect(() => {
    const fetchProductCount = async () => {
      setLoadingProducts(true);
      try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
        setProductCount(Array.isArray(data) ? data.length : 0);
    } catch (err) {
        setProductCount(0);
    } finally {
        setLoadingProducts(false);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      setLoadingUsers(true);
    try {
      const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/auth/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUserCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setUserCount(0);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    // Placeholder: simulate loading payments
    setLoadingPayments(true);
    setTimeout(() => {
      setPaymentCount(120); // Replace with real API call later
      setLoadingPayments(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Placeholder: simulate loading deliveries
    setLoadingDeliveries(true);
    setTimeout(() => {
      setDeliveryCount(42); // Replace with real API call later
      setLoadingDeliveries(false);
    }, 1000);
  }, []);

  // Fetch delivery personnel for Delivery Status
  useEffect(() => {
    setLoadingDeliveryPersonnel(true);
    fetch(`${getApiBaseUrl()}/api/delivery`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch delivery personnel');
        return res.json();
      })
      .then(data => setDeliveryPersonnel(data))
      .catch(() => setDeliveryPersonnel([]))
      .finally(() => setLoadingDeliveryPersonnel(false));
  }, []);

  // Quick Actions handlers (implement navigation as needed)
  const handleAddProduct = () => {
    if (onNavigate && onNavigate.onAddProduct) {
      onNavigate.onAddProduct();
    }
  };
  const handleAddDeliveryPersonnel = () => {
    // Implement navigation or modal for adding delivery personnel
    alert('Add Delivery Personnel feature coming soon!');
  };
  const handleBulkActions = () => {
    // Implement bulk actions logic
    alert('Bulk Actions feature coming soon!');
  };

  if (showAddDelivery) {
    return <AddDeliveryPersonPage onNavigate={() => setShowAddDelivery(false)} />;
  }
  if (showManageDelivery) {
    return <AdminViewDeliveryPersonnel onBack={() => setShowManageDelivery(false)} />;
  }
  if (showViewUsers) {
    return <AdminViewUsers onBack={() => setShowViewUsers(false)} />;
  }
  if (showProductList) {
    return (
      <AdminViewProducts onBack={() => setShowProductList(false)} />
    );
  }
  if (showPayments) {
    return <PaymentsPage onBack={() => setShowPayments(false)} />;
  }
  if (showDeliveries) {
    return <DeliveriesPage onBack={() => setShowDeliveries(false)} />;
  }
  if (showOrders) {
    return <OrdersPage onBack={() => setShowOrders(false)} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: COLORS.secondary,
      padding: '0 0 2rem 0',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '2rem auto 2rem auto',
        background: COLORS.primary,
        padding: '2.5rem 3rem',
        borderRadius: '1.5rem',
        boxShadow: COLORS.cardShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        position: 'relative',
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          minWidth: '250px', 
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }} 
        onClick={() => window.location.href = '/'}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ 
            background: COLORS.button, 
            padding: '0.75rem', 
            borderRadius: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
          }}>
            <ShoppingCart style={{ width: '1.5rem', height: '1.5rem', color: COLORS.primary }} />
          </div>
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: '1.25rem', 
            color: COLORS.text
          }}>Online Grocery</span>
        </div>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: COLORS.text,
          margin: 0,
          textAlign: 'center'
        }}>Admin Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('isAdminAuthenticated');
            window.location.href = '/?route=login';
          }}
          style={{ 
            background: COLORS.button, 
            color: COLORS.primary, 
            padding: '1rem 2.5rem', 
            border: 'none', 
            borderRadius: '0.75rem', 
            fontWeight: 'bold', 
            fontSize: '1rem', 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: COLORS.cardShadow
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.hoverButton;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COLORS.button;
          }}
        >
          Logout
        </button>
      </div>

      {/* Summary Cards - Reorganized in 2x3 Grid */}
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto 3rem auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        padding: '0 1rem'
      }}>
        {/* Products Card */}
        <div
          onClick={() => setShowProductList(true)}
          style={{
            background: COLORS.primary,
            borderRadius: '1.5rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: COLORS.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: `1px solid ${COLORS.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.13)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = COLORS.cardShadow;
          }}
        >
          <div style={{ 
            background: COLORS.button, 
            borderRadius: '50%', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.13)'
          }}>
            <ShoppingCart style={{ width: '2.5rem', height: '2.5rem', color: COLORS.primary }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: COLORS.text }}>Products</div>
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.button }}>
            {loadingProducts ? <span style={{ color: COLORS.text2, fontSize: '2rem' }}>...</span> : productCount}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: COLORS.button, 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            View Details <TrendingUp size={16} />
          </div>
        </div>

        {/* Orders Card */}
        <div
          onClick={() => setShowOrders(true)}
          style={{ 
            background: COLORS.primary,
            borderRadius: '1.5rem', 
            padding: '2.5rem', 
            textAlign: 'center', 
            boxShadow: COLORS.cardShadow,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.5rem',
            border: `1px solid ${COLORS.border}`,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.13)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = COLORS.cardShadow;
          }}
        >
          <div style={{ 
            background: COLORS.button1, 
            borderRadius: '50%', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.13)'
          }}>
            <ClipboardList style={{ width: '2.5rem', height: '2.5rem', color: COLORS.primary }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: COLORS.text }}>Orders</div>
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.button1 }}>{orderCount.toLocaleString()}</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: COLORS.button1,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
            onClick={e => {
              e.stopPropagation();
              setShowOrders(true);
            }}
          >
            View Details <TrendingUp size={16} />
          </div>
        </div>

        {/* Users Card */}
        <div
          onClick={() => setShowViewUsers(true)}
              style={{
            background: COLORS.primary,
            borderRadius: '1.5rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: COLORS.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: `1px solid ${COLORS.border}`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.13)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = COLORS.cardShadow;
          }}
        >
          <div style={{ 
            background: COLORS.button2, 
            borderRadius: '50%', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.13)'
          }}>
            <UsersIcon style={{ width: '2.5rem', height: '2.5rem', color: COLORS.primary }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: COLORS.text }}>Users</div>
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.button2 }}>
            {loadingUsers ? <span style={{ color: COLORS.text2, fontSize: '2rem' }}>...</span> : userCount}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: COLORS.button2, 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            View Details <TrendingUp size={16} />
          </div>
        </div>

        {/* Payments Card */}
        <div
          onClick={() => setShowPayments(true)}
            style={{
            background: COLORS.primary,
            borderRadius: '1.5rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: COLORS.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
              cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: `1px solid ${COLORS.border}`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 158, 66, 0.13)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = COLORS.cardShadow;
          }}
        >
          <div style={{ 
            background: COLORS.secondary2, 
            borderRadius: '50%', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245, 158, 66, 0.13)'
          }}>
            <CreditCard style={{ width: '2.5rem', height: '2.5rem', color: COLORS.primary }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: COLORS.text }}>Payments</div>
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.secondary2 }}>
            {loadingPayments ? <span style={{ color: COLORS.text2, fontSize: '2rem' }}>...</span> : paymentCount}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: COLORS.secondary2, 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            View Details <TrendingUp size={16} />
          </div>
        </div>

        {/* Deliveries Card */}
        <div
          onClick={() => setShowDeliveries(true)}
          style={{
            background: COLORS.primary,
            borderRadius: '1.5rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: COLORS.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: `1px solid ${COLORS.border}`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.13)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = COLORS.cardShadow;
          }}
        >
          <div style={{ 
            background: COLORS.button1, 
            borderRadius: '50%', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.13)'
          }}>
            <Truck style={{ width: '2.5rem', height: '2.5rem', color: COLORS.primary }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: COLORS.text }}>Deliveries</div>
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.button1 }}>
            {loadingDeliveries ? <span style={{ color: COLORS.text2, fontSize: '2rem' }}>...</span> : deliveryCount}
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: COLORS.button1, 
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            View Details <TrendingUp size={16} />
          </div>
        </div>

        {/* Quick Actions Card */}
        <div style={{
          background: COLORS.primary,
          borderRadius: '1.5rem',
          padding: '2.5rem',
            textAlign: 'center', 
          boxShadow: COLORS.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          border: `1px solid ${COLORS.border}`,
          minHeight: '370px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            gap: '1.25rem',
            height: '100%',
          }}>
              <button
                onClick={handleAddProduct}
                style={{
                background: COLORS.button, 
                color: COLORS.primary, 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '0.75rem', 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: 1,
                minHeight: '48px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = COLORS.hoverButton}
              onMouseLeave={(e) => e.currentTarget.style.background = COLORS.button}
            >
              <Package size={18} /> Add Product
            </button>
            <button 
              onClick={() => setShowAddDelivery(true)} 
              style={{ 
                background: COLORS.button2, 
                color: COLORS.primary, 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '0.75rem', 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: 1,
                minHeight: '48px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.background = COLORS.button2}
            >
              <Truck size={18} /> Add Personnel
            </button>
            <button 
              onClick={() => setShowManageDelivery(true)} 
              style={{ 
                background: COLORS.button1, 
                color: COLORS.primary, 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '0.75rem', 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: 1,
                minHeight: '48px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = COLORS.button1}
            >
              <UsersIcon size={18} /> Manage Personnel
            </button>
            <button 
              onClick={() => setShowPayments(true)} 
              style={{ 
                background: COLORS.secondary2, 
                color: COLORS.primary, 
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                borderRadius: '0.75rem', 
                fontWeight: 'bold', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flex: 1,
                minHeight: '48px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#d97706'}
              onMouseLeave={(e) => e.currentTarget.style.background = COLORS.secondary2}
            >
              <span style={{fontWeight:'bold',fontSize:'1.2em',marginRight:'0.2em'}}>₱</span> Manage Payments
            </button>
          </div>
        </div>
      </div>

      {/* Pending Orders Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '2rem',
          color: '#1f2937',
          letterSpacing: '-0.5px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          📋 Pending Orders
        </div>

        {/* Pending Orders & Active Delivery */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem'
        }}>
          {/* Home Delivery Section */}
          <div style={{ 
            background: 'white', 
            borderRadius: '1.5rem', 
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MapPin size={24} color="#ef4444" />
              Home Delivery Orders
            </h3>
            
            {/* Enhanced Table */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Customer</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Address</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Phone</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Amount</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Payment</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#374151', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', height: '56px' }}>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>John Doe</td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mandaue City, Cebu</td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>09282323234</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', verticalAlign: 'middle', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2em' }}>
                      <span style={{fontWeight:'bold',fontSize:'1.1em'}}>₱</span> 2,530
                    </td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>Gcash</td>
                    <td style={{ padding: '1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <span style={{ 
                        background: '#dcfce7', 
                        color: '#166534', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>Paid</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <button style={{ 
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '0.5rem', 
                        padding: '0.5rem 1.2rem', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        Assign Delivery
                      </button>
                    </td>
                  </tr>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f1f5f9', height: '56px' }}>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>Jane Smith</td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Cebu City, Cebu</td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>09123456789</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', verticalAlign: 'middle', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2em' }}>
                      <span style={{fontWeight:'bold',fontSize:'1.1em'}}>₱</span> 1,850
                    </td>
                    <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>Cash</td>
                    <td style={{ padding: '1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <span style={{ 
                        background: '#fef3c7', 
                        color: '#92400e', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>Pending</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <button style={{ 
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '0.5rem', 
                        padding: '0.5rem 1.2rem', 
                  cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                        Assign Delivery
              </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              marginTop: '2rem',
              marginBottom: '1rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Package size={24} color="#2563eb" />
              Personal Pickups
            </h3>
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              border: '2px dashed #cbd5e1',
              color: '#64748b'
            }}>
              <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '1.1rem' }}>No personal pickup orders at the moment</p>
            </div>
          </div>

          {/* Delivery Status Section */}
          <div style={{ 
            background: 'white', 
            borderRadius: '1.5rem', 
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            minHeight: '400px'
          }}>
            <h2 style={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              marginBottom: '2rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Truck size={24} color="#10b981" />
              Delivery Status
            </h2>
            {loadingDeliveryPersonnel ? (
              <div style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem', marginTop: '2rem' }}>Loading delivery personnel...</div>
            ) : deliveryPersonnel.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem', marginTop: '2rem' }}>No delivery personnel found.</div>
            ) : (
              deliveryPersonnel.map((person, idx) => (
                <div key={person.id} style={{
                  background: idx % 2 === 0
                    ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                    : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '0.75rem',
                  padding: '0.9rem 1.2rem',
                  border: idx % 2 === 0 ? '1px solid #a7f3d0' : '1px solid #fcd34d',
                  marginBottom: '0.7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <div style={{
                      background: idx % 2 === 0
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #f59e42 0%, #d97706 100%)',
                      borderRadius: '50%',
                      width: '2.2rem',
                      height: '2.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                    }}>
                      {person.name && person.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', lineHeight: 1 }}>{person.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.1 }}>Delivery Personnel</div>
                    </div>
                  </div>
                  <div style={{ 
                    background: idx % 2 === 0 ? '#10b981' : '#f59e42', 
                    color: 'white', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '0.4rem', 
                    fontSize: '0.78rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: 'fit-content',
                    marginLeft: '2.9rem'
                  }}>
                    {person.status === 'Active' ? '🚚 On Route' : '⏸️ Inactive'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 