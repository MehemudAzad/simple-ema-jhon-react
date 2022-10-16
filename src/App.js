import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
// import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Main from './components/layout/Main';
import Orders from './components/Orders/Orders';
// import Order from './components/Orders/Orders';
import Shop from './components/Shop/Shop';
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
          element:<Inventory></Inventory>
        },
        {
         path: 'about',
         element: <About></About>
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
