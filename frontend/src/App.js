import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';
import OrderDetails from './views/OrderDetails'; // ✅ nuevo import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/my-orders" />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-order/" element={<AddEditOrder />} />   
        <Route path="/add-order/:id" element={<AddEditOrder />} />
        <Route path="/orders/:id" element={<OrderDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
