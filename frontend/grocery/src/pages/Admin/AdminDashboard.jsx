import React, { useState, useEffect } from 'react';
import { ShoppingCart, ClipboardList, Users as UsersIcon, CreditCard, Truck, TrendingUp, Package, DollarSign, MapPin } from 'lucide-react';
import AdminViewUsers from './AdminViewUsers';
import AdminViewProducts from './AdminViewProducts';
import AddDeliveryPersonPage from './AddDeliveryPersonPage';
import AdminViewDeliveryPersonnel from './AdminViewDeliveryPersonnel';
import AdminViewPayments from './AdminViewPayments';
import AdminViewDeliveries from './AdminViewDeliveries';
import AdminViewOrders from './AdminViewOrders';
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
  const [orderCount, setOrderCount] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignOrder, setSelectedAssignOrder] = useState(null);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const statusOptions = [
    "Processing",
    "Ready to Pick Up",
    "Ready to Deliver",
    "Completed",
    "Cancelled"
  ];

  // Define shared columns for both tables
  const orderTableColumns = [
    { label: 'Customer', key: 'customerName', width: '14%' },
    { label: 'Address', key: 'address', width: '20%' },
    { label: 'Amount', key: 'totalAmount', width: '12%' },
    { label: 'Payment', key: 'paymentMethod', width: '10%' },
    { label: 'Delivery Personnel', key: 'deliveryPerson', width: '15%' },
    { label: 'Date', key: 'orderDate', width: '18%' },
    { label: '', key: 'manage', width: '11%' },
  ];

  // Function to get delivery personnel name by ID
  const getDeliveryPersonName = (deliveryPersonId) => {
    if (!deliveryPersonId) return '-';
    const person = deliveryPersonnel.find(p => p.id === deliveryPersonId);
    return person ? person.name : 'Unknown';
  };

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
    const fetchPaymentCount = async () => {
    setLoadingPayments(true);
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/orders`);
        if (!response.ok) throw new Error('Failed to fetch payments');
        const data = await response.json();
        setPaymentCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setPaymentCount(0);
      } finally {
      setLoadingPayments(false);
      }
    };
    fetchPaymentCount();
  }, []);

  useEffect(() => {
    setLoadingDeliveries(true);
    // Count orders with paymentMethod !== 'pickup' as deliveries
    if (orders && Array.isArray(orders)) {
      const deliveryOrders = orders.filter(order => order.paymentMethod !== 'pickup');
      setDeliveryCount(deliveryOrders.length);
    } else {
      setDeliveryCount(0);
    }
    setLoadingDeliveries(false);
  }, [orders]);

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

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrderCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setOrderCount(0);
      }
    };
    fetchOrderCount();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      setErrorOrders('');
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setOrders([]);
        setErrorOrders('Could not load orders.');
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  // Sync newStatus with selectedOrder when modal opens
  useEffect(() => {
    if (showOrderModal && selectedOrder) {
      setNewStatus(selectedOrder.status);
    }
  }, [showOrderModal, selectedOrder]);

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

  // Only show orders with status 'Pending' in Pending Orders section
  const deliveryOrders = orders.filter(order => order.paymentMethod !== 'pickup' && order.status === 'Pending');
  const pickupOrders = orders.filter(order => order.paymentMethod === 'pickup' && order.status === 'Pending');

  const handleMarkPickedUp = (orderId) => {
    alert(`Order ${orderId} marked as picked up!`);
    // TODO: Implement backend call to update order status
  };

  const readyToDeliverOrders = orders.filter(order => order.status === 'Ready to Deliver');

  const handleAssignDelivery = () => {
    setShowAssignModal(true);
  };

  // Add a function to refresh orders and counts
  const refreshDashboardData = async () => {
    try {
      const apiBaseUrl = getApiBaseUrl();
      // Fetch orders
      const ordersRes = await fetch(`${apiBaseUrl}/api/orders`);
      const ordersData = ordersRes.ok ? await ordersRes.json() : [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      // Fetch counts
      const productsRes = await fetch(`${apiBaseUrl}/api/products`);
      const usersRes = await fetch(`${apiBaseUrl}/api/auth/users`);
      const paymentsRes = await fetch(`${apiBaseUrl}/api/orders`);
      setProductCount(productsRes.ok ? (await productsRes.json()).length : 0);
      setUserCount(usersRes.ok ? (await usersRes.json()).length : 0);
      setPaymentCount(paymentsRes.ok ? (await paymentsRes.json()).length : 0);
      setOrderCount(ordersRes.ok ? (await ordersRes.json()).length : 0);
    } catch (err) {
      // fallback: do not update counts
    }
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
    return <AdminViewPayments onBack={() => setShowPayments(false)} />;
  }
  if (showDeliveries) {
    return <AdminViewDeliveries onBack={() => setShowDeliveries(false)} />;
  }
  if (showOrders) {
    return <AdminViewOrders onBack={() => setShowOrders(false)} />;
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
          <div style={{ fontWeight: 'bold', fontSize: '3rem', color: COLORS.button1 }}>{orderCount != null ? orderCount.toLocaleString() : 0}</div>
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
              onClick={handleAssignDelivery}
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
              <Truck size={18} /> Assign Delivery
            </button>
            <button 
              onClick={() => setShowManageDelivery(true)} 
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
              <UsersIcon size={18} /> Manage Personnel
            </button>
            <button 
              onClick={() => setShowOrders(true)} 
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
              <ClipboardList size={18} /> Manage Orders
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
              border: '1px solid #e2e8f0',
              maxHeight: '420px',
              minHeight: '120px',
              display: 'block',
            }}>
              <div style={{ maxHeight: '300px', overflowY: deliveryOrders.length > 5 ? 'auto' : 'visible' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', position: 'sticky', top: 0, zIndex: 2 }}>
                    <tr>
                      {orderTableColumns.map(col => (
                        <th
                          key={col.key}
                          style={{
                            padding: '1rem',
                            textAlign: col.key === 'manage' ? 'center' : 'left',
                            color: '#374151',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            whiteSpace: 'nowrap',
                            width: col.width
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                    {loadingOrders ? (
                      <tr><td colSpan={orderTableColumns.length} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Loading orders...</td></tr>
                    ) : errorOrders ? (
                      <tr><td colSpan={orderTableColumns.length} style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{errorOrders}</td></tr>
                    ) : deliveryOrders.length === 0 ? (
                      <tr><td colSpan={orderTableColumns.length} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No delivery orders found.</td></tr>
                    ) : (
                      deliveryOrders.map((order, idx) => (
                        <tr
                          key={order.id}
                          style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #f1f5f9', height: '56px', cursor: 'pointer' }}
                          onClick={e => {
                            // Prevent modal if clicking the action button
                            if (e.target.tagName === 'BUTTON') return;
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                        >
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[0].width }}>{order.customerName}</td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: orderTableColumns[1].width }}>{order.address}</td>
                          <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', verticalAlign: 'middle', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2em', width: orderTableColumns[2].width }}>
                            <span style={{fontWeight:'bold',fontSize:'1.1em'}}>₱</span> {order.totalAmount?.toLocaleString()}
                    </td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[3].width }}>{order.paymentMethod}</td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[4].width }}>
                            {(order.status === 'On Route' || order.status === 'Accepted' || order.status === 'Delivered')
                              ? getDeliveryPersonName(order.deliveryPersonId)
                              : '-'}
                          </td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[5].width }}>
                            {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}
                    </td>
                          <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'middle', width: orderTableColumns[6].width }}>
                            <button
                              style={{
                                background: '#2563eb',
                                color: '#fff',
                        border: 'none', 
                        borderRadius: '0.5rem', 
                                padding: '0.32rem 1.1rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                  cursor: 'pointer',
                                transition: 'background 0.18s',
                                boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
                                letterSpacing: '0.01em',
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                }}
                              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                              Manage
              </button>
                    </td>
                  </tr>
                      ))
                    )}
                </tbody>
              </table>
              </div>
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
              background: '#f8fafc',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0',
              maxHeight: '420px',
              minHeight: '120px',
              display: 'block',
            }}>
              <div style={{ maxHeight: '300px', overflowY: pickupOrders.length > 5 ? 'auto' : 'visible' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', position: 'sticky', top: 0, zIndex: 2 }}>
                    <tr>
                      {orderTableColumns.map(col => (
                        <th
                          key={col.key}
                          style={{
                            padding: '1rem',
                            textAlign: col.key === 'manage' ? 'center' : 'left',
                            color: '#374151',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            whiteSpace: 'nowrap',
                            width: col.width
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pickupOrders.length === 0 ? (
                      <tr><td colSpan={orderTableColumns.length} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No personal pickup orders at the moment</td></tr>
                    ) : (
                      pickupOrders.map((order, idx) => (
                        <tr
                          key={order.id}
                          style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #f1f5f9', height: '56px', cursor: 'pointer' }}
                          onClick={e => {
                            // Prevent modal if clicking the action button
                            if (e.target.tagName === 'BUTTON') return;
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                        >
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[0].width }}>{order.customerName}</td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: orderTableColumns[1].width }}>{order.address}</td>
                          <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', verticalAlign: 'middle', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2em', width: orderTableColumns[2].width }}>
                            <span style={{fontWeight:'bold',fontSize:'1.1em'}}>₱</span> {order.totalAmount?.toLocaleString()}
                          </td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[3].width }}>{order.paymentMethod}</td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[4].width }}>
                            {getDeliveryPersonName(order.deliveryPersonId)}
                          </td>
                          <td style={{ padding: '1rem', color: '#6b7280', verticalAlign: 'middle', whiteSpace: 'nowrap', width: orderTableColumns[5].width }}>
                            {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'middle', width: orderTableColumns[6].width }}>
                            <button
                              style={{
                                background: '#2563eb',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.32rem 1.1rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'background 0.18s',
                                boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
                                letterSpacing: '0.01em',
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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

      {/* Modal popup for order details */}
      {showOrderModal && selectedOrder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowOrderModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '1.1rem',
              padding: '2rem 2rem 1.5rem 2rem',
              minWidth: 340,
              maxWidth: 440,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              position: 'relative',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowOrderModal(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
                fontSize: 22,
              }}
              title="Close"
            >
              ×
            </button>
            <h3 style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 10, color: '#1f2937', textAlign: 'center', letterSpacing: '-0.5px' }}>Order Details</h3>
            <div style={{ fontSize: '1.05rem', color: '#1f2937', marginBottom: 10, width: '100%' }}>
              <div style={{ marginBottom: 4 }}><b>Order ID:</b> {selectedOrder.id}</div>
              <div style={{ marginBottom: 4 }}><b>Customer:</b> {selectedOrder.customerName}</div>
              <div style={{ marginBottom: 4 }}><b>Amount:</b> ₱{selectedOrder.totalAmount?.toLocaleString()}</div>
              <div style={{ marginBottom: 4 }}><b>Status:</b> {selectedOrder.status}</div>
            </div>
            <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', margin: '10px 0 12px 0', paddingTop: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: '#222' }}>Items:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {(selectedOrder.items && selectedOrder.items.length > 0)
                  ? selectedOrder.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: 4, color: '#374151', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                        <span>{item.productName || item.product_name || 'Item'}</span>
                      </li>
                    ))
                  : <li style={{ color: '#888', fontSize: '0.97rem' }}>No items</li>
                }
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '10px 0 0 0', width: '100%' }}>
              {(
                selectedOrder.paymentMethod === 'pickup'
                  ? ["Processing", "Ready to Pick Up", "Completed", "Cancelled"]
                  : ["Processing", "Ready to Deliver", "Completed", "Cancelled"]
              ).map(status => (
                <button
                  key={status}
                  onClick={async () => {
                    try {
                      const apiBaseUrl = getApiBaseUrl();
                      const response = await fetch(`${apiBaseUrl}/api/orders/${selectedOrder.id}/status`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(status),
                      });
                      if (!response.ok) throw new Error('Failed to update status');
                      setOrders(orders =>
                        orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o)
                      );
                      setShowOrderModal(false);
                      await refreshDashboardData();
                    } catch (err) {
                      alert('Failed to update order status.');
                    }
                  }}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '0.5rem',
                    border: status === selectedOrder.status ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    background: status === selectedOrder.status ? '#2563eb' : '#f3f4f6',
                    color: status === selectedOrder.status ? '#fff' : '#222',
                    fontWeight: 600,
                    fontSize: '0.97rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.15s',
                    minWidth: 90,
                  }}
                  disabled={status === selectedOrder.status}
                >
                  {status}
                </button>
              ))}
            </div>
            {/* Delete button at the bottom of the modal */}
            <button
              style={{
                marginTop: 24,
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.6rem 1.2rem',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                width: '100%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
              onClick={async () => {
                if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
                try {
                  const apiBaseUrl = getApiBaseUrl();
                  const response = await fetch(`${apiBaseUrl}/api/orders/${selectedOrder.id}`, {
                    method: 'DELETE',
                  });
                  if (!response.ok) throw new Error('Failed to delete order');
                  setOrders(orders => orders.filter(o => o.id !== selectedOrder.id));
                  setShowOrderModal(false);
                  await refreshDashboardData();
                } catch (err) {
                  alert('Failed to delete order.');
                }
              }}
            >
              Delete Order
            </button>
          </div>
        </div>
      )}

      {/* Assign Delivery Modal */}
      {showAssignModal && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowAssignModal(false)}
        >
          <div
            style={{ background: '#fff', borderRadius: '1.25rem', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 400, maxWidth: 520, boxShadow: '0 12px 40px rgba(0,0,0,0.18)', position: 'relative', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: '100%', height: 6, background: '#2563eb', borderRadius: '1.25rem 1.25rem 0 0', position: 'absolute', top: 0, left: 0 }} />
            <button onClick={() => setShowAssignModal(false)} style={{ position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 26, fontWeight: 700 }} title="Close">×</button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10, marginTop: 6 }}>
              <div style={{ background: '#2563eb', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: '0 2px 8px rgba(37,99,235,0.10)' }}>
                <Truck size={28} color="#fff" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1.45rem', marginBottom: 0, color: '#1f2937', textAlign: 'center', letterSpacing: '-0.5px' }}>Assign Delivery</h3>
            </div>
            <div style={{ width: '100%', borderBottom: '1px solid #e5e7eb', marginBottom: 18 }} />
            <div style={{ width: '100%', marginBottom: 18 }}>
              <label style={{ fontWeight: 700, color: '#222', marginBottom: 6, display: 'block', fontSize: '1.05rem' }}>Order (Ready to Deliver):</label>
              <select
                value={selectedAssignOrder ? selectedAssignOrder.id : ''}
                onChange={e => {
                  const order = readyToDeliverOrders.find(o => String(o.id) === String(e.target.value));
                  setSelectedAssignOrder(order || null);
                }}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '0.6rem', border: '1.5px solid #d1d5db', marginBottom: 4, fontSize: '1.05rem', background: '#f9fafb', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px rgba(37,99,235,0.04)' }}
                onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
                onBlur={e => e.target.style.border = '1.5px solid #d1d5db'}
              >
                <option value="">Select an order...</option>
                {readyToDeliverOrders.map(order => (
                  <option key={order.id} value={order.id}>
                    #{order.id} - {order.customerName} (₱{order.totalAmount?.toLocaleString()})
                  </option>
                ))}
              </select>
              <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 8, marginLeft: 2 }}>Choose an order that is ready for delivery.</div>
            </div>
            <div style={{ width: '100%', marginBottom: 18 }}>
              <label style={{ fontWeight: 700, color: '#222', marginBottom: 6, display: 'block', fontSize: '1.05rem' }}>Delivery Personnel:</label>
              <select
                value={selectedDeliveryPerson ? selectedDeliveryPerson.id : ''}
                onChange={e => {
                  const person = deliveryPersonnel.find(p => String(p.id) === String(e.target.value));
                  setSelectedDeliveryPerson(person || null);
                }}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '0.6rem', border: '1.5px solid #d1d5db', marginBottom: 4, fontSize: '1.05rem', background: '#f9fafb', outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 4px rgba(37,99,235,0.04)' }}
                onFocus={e => e.target.style.border = '1.5px solid #2563eb'}
                onBlur={e => e.target.style.border = '1.5px solid #d1d5db'}
              >
                <option value="">Select personnel...</option>
                {deliveryPersonnel.map(person => (
                  <option key={person.id} value={person.id}>{person.name}</option>
                ))}
              </select>
              <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 8, marginLeft: 2 }}>Select a delivery person to assign to this order.</div>
            </div>
            {selectedAssignOrder && selectedDeliveryPerson && (
              <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '0.6rem', padding: '0.9rem 1.1rem', marginBottom: 18, fontSize: '1.05rem', color: '#222', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div><b>Order:</b> #{selectedAssignOrder.id} - {selectedAssignOrder.customerName} (₱{selectedAssignOrder.totalAmount?.toLocaleString()})</div>
                <div><b>Delivery Person:</b> {selectedDeliveryPerson.name}</div>
              </div>
            )}
            {assigning && (
              <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.05rem', marginBottom: 10, marginTop: 2 }}>Assigning delivery...</div>
            )}
            <button
              disabled={!selectedAssignOrder || !selectedDeliveryPerson || assigning}
              style={{
                background: (!selectedAssignOrder || !selectedDeliveryPerson) ? '#e5e7eb' : 'linear-gradient(90deg,#2563eb 60%,#1d4ed8 100%)',
                color: (!selectedAssignOrder || !selectedDeliveryPerson) ? '#888' : '#fff',
                border: 'none',
                borderRadius: '0.6rem',
                padding: '0.9rem 1.2rem',
                fontWeight: 800,
                fontSize: '1.13rem',
                cursor: (!selectedAssignOrder || !selectedDeliveryPerson) ? 'not-allowed' : 'pointer',
                transition: 'background 0.18s, box-shadow 0.18s',
                width: '100%',
                marginTop: 8,
                boxShadow: (!selectedAssignOrder || !selectedDeliveryPerson) ? 'none' : '0 2px 8px rgba(37,99,235,0.10)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                if (!selectedAssignOrder || !selectedDeliveryPerson) return;
                e.currentTarget.style.background = 'linear-gradient(90deg,#1d4ed8 60%,#2563eb 100%)';
              }}
              onMouseLeave={e => {
                if (!selectedAssignOrder || !selectedDeliveryPerson) return;
                e.currentTarget.style.background = 'linear-gradient(90deg,#2563eb 60%,#1d4ed8 100%)';
              }}
              onClick={async () => {
                if (!selectedAssignOrder || !selectedDeliveryPerson) return;
                setAssigning(true);
                try {
                  const apiBaseUrl = getApiBaseUrl();
                  const response = await fetch(`${apiBaseUrl}/api/orders/${selectedAssignOrder.id}/assign-delivery`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ deliveryPersonId: selectedDeliveryPerson.id }),
                  });
                  if (!response.ok) throw new Error('Failed to assign delivery');
                  setOrders(orders => orders.map(o => o.id === selectedAssignOrder.id ? { ...o, deliveryPerson: selectedDeliveryPerson } : o));
                  setShowAssignModal(false);
                  setSelectedAssignOrder(null);
                  setSelectedDeliveryPerson(null);
                  await refreshDashboardData();
                  // Show a success message (optional: implement a toast or alert)
                  setTimeout(() => alert('Delivery assigned successfully!'), 200);
                } catch (err) {
                  alert('Failed to assign delivery.');
                } finally {
                  setAssigning(false);
                }
              }}
            >
              {assigning ? 'Assigning...' : 'Assign'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 