
// import './index.css'

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './hooks/useAuth.jsx'; // ✅ your auth context
// import { CartProvider } from './hooks/useCart.jsx'; // ✅ import your cart context

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider> {/* ✅ Add this */}
//           <App />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import './index.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import { AdminAuthProvider } from './hooks/AdminAuthProvider.jsx' // Added AdminAuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AdminAuthProvider> 
            <App />
          </AdminAuthProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);