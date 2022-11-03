import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
// import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Main from './components/layout/Main';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipping from './components/Shipping/Shipping';
// import Order from './components/Orders/Orders';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUp/SignUp';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';

function App() {
  const router = createBrowserRouter([
     {
      path:'/',
      element: <Main></Main>,
      children:[
        {
          path: '/',//this will be displayed first
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: '/orders', 
          loader: productsAndCartLoader,
          element:<Orders></Orders>
        },
        {
          path: '/inventory', 
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute> 
        },
        {
         path: 'about',
         element: <About></About>
        },
        {
         path: 'login',
         element: <Login></Login>
        },
        {
         path: 'signup',
         element: <SignUp></SignUp>
        },
        {
          path: 'shipping',
          element:<PrivateRoute><Shipping></Shipping></PrivateRoute> 
        }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
