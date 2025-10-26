import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o.id === parseInt(id));
        setOrder(found || null);
      })
      .catch(err => {
        console.error('Error fetching order:', err);
      });
  }, [id]);

  if (!order) return <p>Loading or order not found...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Order Details</h1>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Order #:</strong> {order.ordernumber}</p>
      <p><strong>Date:</strong> {order.date.split('T')[0]}</p>
      <p><strong># Products:</strong> {order.productscount ?? '-'}</p>
      <p><strong>Final Price:</strong> {order.finalprice ? `$${order.finalprice}` : '-'}</p>
      <button
        onClick={() => navigate('/my-orders')}
        style={{
          marginTop: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Back to Orders
      </button>
    </div>
  );
}

export default OrderDetails;
