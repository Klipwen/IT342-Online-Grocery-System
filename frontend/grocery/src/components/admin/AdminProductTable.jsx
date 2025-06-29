import React from 'react';

const AdminProductTable = ({ products, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toFixed(2)}` : 'N/A';
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.9rem'
      }}>
        <thead>
          <tr style={{
            background: '#f9fafb',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Product
            </th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Category
            </th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Price
            </th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Stock
            </th>
            <th style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Status
            </th>
            <th style={{
              padding: '1rem',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{
              borderBottom: '1px solid #e5e7eb',
              transition: 'background-color 0.2s'
            }}>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={product.image || '/placeholder-image.png'}
                    alt={product.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '0.375rem',
                      objectFit: 'cover',
                      border: '1px solid #e5e7eb'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {truncateText(product.name, 25)}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      ID: {product.id}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '1rem', color: '#374151' }}>
                {product.category || 'N/A'}
              </td>
              <td style={{ padding: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
                    {formatPrice(product.price)}
                  </div>
                  {product.salePrice && product.salePrice !== product.price && (
                    <div style={{ fontSize: '0.8rem', color: '#ef4444', textDecoration: 'line-through' }}>
                      {formatPrice(product.salePrice)}
                    </div>
                  )}
                </div>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  background: product.quantity > 10 ? '#dcfce7' : product.quantity > 0 ? '#fef3c7' : '#fee2e2',
                  color: product.quantity > 10 ? '#166534' : product.quantity > 0 ? '#92400e' : '#dc2626'
                }}>
                  {product.quantity || 0} in stock
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {product.bestSelling && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: '#dbeafe',
                      color: '#1e40af'
                    }}>
                      Best Seller
                    </span>
                  )}
                  {product.discount && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: '#fef3c7',
                      color: '#92400e'
                    }}>
                      {product.discount}
                    </span>
                  )}
                </div>
              </td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => onEdit(product.id)}
                    style={{
                      background: '#3b82f6',
                      color: 'white',
                      padding: '0.5rem 0.75rem',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                    title="Edit Product"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      padding: '0.5rem 0.75rem',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                    title="Delete Product"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable; 