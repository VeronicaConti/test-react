import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditOrder() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState('');
  const [date, setDate] = useState('');
  const [productsCount, setProductsCount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0.0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productsInOrder, setProductsInOrder] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);

    if (isEdit) {
      setOrderNumber('A001');
      setProductsCount(3);
      setFinalPrice(150.0);
    }
  }, [isEdit]);

  useEffect(() => {
    const totalProducts = productsInOrder.reduce((sum, p) => sum + p.qty, 0);
    const totalPrice = productsInOrder.reduce((sum, p) => sum + p.totalPrice, 0);
    setProductsCount(totalProducts);
    setFinalPrice(totalPrice);
  }, [productsInOrder]);

  const handleSaveOrder = () => {
    if (!orderNumber.trim()) {
      alert('Please enter an Order #.');
      return;
    }

    if (productsInOrder.length === 0) {
      alert('Please add at least one product.');
      return;
    }

    const payload = {
      orderNumber,
      date,
      productsCount,
      finalPrice
    };

    fetch('https://test-react-production.up.railway.app/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => {
        alert('Order saved successfully!');
        navigate('/my-orders');
      })
      .catch(err => {
        console.error('Error saving order:', err);
        alert('Error saving order.');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{isEdit ? 'Edit Order' : 'Add Order'}</h1>

      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label>Order #:</label><br />
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Date:</label><br />
          <input type="text" value={date} disabled />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label># Products:</label><br />
          <input type="number" value={productsCount} disabled />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Final Price:</label><br />
          <input type="text" value={`$${finalPrice.toFixed(2)}`} disabled />
        </div>
      </form>

      <button onClick={() => setShowProductModal(true)} style={{ marginTop: '1rem' }}>
        Add Product
      </button>

      {productsInOrder.length > 0 && (
        <>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productsInOrder.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.unitPrice.toFixed(2)}</td>
                  <td>{product.qty}</td>
                  <td>${product.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSaveOrder}
            style={{
              marginTop: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Save Order
          </button>
        </>
      )}

      {showProductModal && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '30%',
          width: '40%',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '1rem',
          zIndex: 1000
        }}>
          <h3>Add Product</h3>
          <select id="productSelect">
            <option value="1">Product A - $50</option>
            <option value="2">Product B - $30</option>
            <option value="3">Product C - $70</option>
          </select>
          <br /><br />
          <input type="number" id="productQty" placeholder="Quantity" />
          <br /><br />
          <button onClick={() => {
            const select = document.getElementById('productSelect');
            const qty = parseInt(document.getElementById('productQty').value);
            if (!qty || qty <= 0) return alert('Please enter a valid quantity');

            const selectedId = parseInt(select.value);
            const selectedName = select.options[select.selectedIndex].text.split(' - ')[0];
            const unitPrice = parseFloat(select.options[select.selectedIndex].text.split('$')[1]);

            const newProduct = {
              id: selectedId,
              name: selectedName,
              unitPrice,
              qty,
              totalPrice: unitPrice * qty
            };

            setProductsInOrder([...productsInOrder, newProduct]);
            setShowProductModal(false);
          }}>
            Confirm
          </button>
          <button onClick={() => setShowProductModal(false)} style={{ marginLeft: '1rem' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEditOrder;
