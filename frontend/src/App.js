import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/my-orders" />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-order/" element={<AddEditOrder />} />   
        <Route path="/add-order/:id" element={<AddEditOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
