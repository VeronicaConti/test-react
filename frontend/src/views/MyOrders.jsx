import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = () => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error al obtener órdenes:', err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    fetch(`http://localhost:3001/orders/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        alert('Order deleted successfully!');
        fetchOrders(); // refresca la tabla
      })
      .catch(err => {
        console.error('Error deleting order:', err);
        alert('Error deleting order.');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Orders</h1>
      <button
        onClick={() => navigate('/add-order')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        New Order
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order #</th>
              <th>Date</th>
              <th># Products</th>
              <th>Final Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.ordernumber}</td>
                <td>{order.date.split('T')[0]}</td>
                <td>{order.productscount ?? '-'}</td>
                <td>{order.finalprice ? `$${order.finalprice}` : '-'}</td>
                <td>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    style={{
                      marginRight: '0.5rem',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    style={{
                      backgroundColor: '#dc3545',
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
    </div>
  );
}

export default MyOrders;
