import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://test-react-production.up.railway.app/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Respuesta inesperada del backend:', data);
          setOrders([]);
        }
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setOrders([]);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://test-react-production.up.railway.app/orders/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updated = orders.filter(o => o.id !== id);
        setOrders(updated);
      })
      .catch(err => console.error('Error deleting order:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Orders</h1>

      <button
        onClick={() => navigate('/add-order')}
        style={{
          marginBottom: '1rem',
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        New Order
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th># Products</th>
              <th>Final Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.date}</td>
                <td>{order.productscount}</td>
                <td>${order.finalprice ? order.finalprice.toFixed(2) : '—'}</td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      backgroundColor: '#FFB74D',
                      color: 'black',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      marginRight: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          backgroundColor: '#FFF8F0',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1.5rem',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          <h2>Order Details: {selectedOrder.orderNumber}</h2>
          <p>Date: {selectedOrder.date}</p>

          {(() => {
            const parsedProducts = Array.isArray(selectedOrder.products)
              ? selectedOrder.products
              : JSON.parse(selectedOrder.products || '[]');

            return (
              <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedProducts.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>${p.unitPrice.toFixed(2)}</td>
                      <td>{p.qty}</td>
                      <td>${p.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}

          <button
            onClick={() => setSelectedOrder(null)}
            style={{
              marginTop: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
