import React from 'react'
import { RouterProvider} from "react-router-dom";
import Layout from './Layouts/Layout.jsx';
import Home from './component/web/Home/Home.jsx';
import Categories from './component/web/Categories/Categories.jsx';
import DashboardLayouts from './Layouts/DashboardLayouts.jsx';
import Homedashboard from './component/dashboard/Home/Homedashboard.jsx';
import CategoriesDashboard from './component/dashboard/Categories/CategoriesDashboard';
import Register from './component/web/Register/Register.jsx';
import Login from './component/web/Login/Login.jsx';
import { createBrowserRouter } from "react-router-dom";
import { useEffect,useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import CategoriesDetails from './component/web/Categories/CategoriesDetails';
import Cart from './component/web/Cart/Cart.jsx';
import { CartContextProvider } from './component/web/Context/Cart.jsx';
import {UserContexProvider} from './component/web/Context/User.jsx';
import Profile from './component/web/Profile/Profile.jsx';
import Guard from './component/web/Guard/Guard';
import UserContent from './component/web/Profile/UserContent.jsx';
import UserInfo from './component/web/Profile/UserInfo.jsx';
import SendCode from './component/web/Auth/SendCode.jsx';
import Order from './component/web/Order/Order.jsx';
import { OrderContextProvider } from './component/web/Context/Order.jsx';


// when user signin must change register to profile so send {user} to navbar by layout

const saveCurrentUser = ()=>{    // فنكشن يفك التشفير (Decrypts)
  const token = localStorage.getItem("userToken");
  const decoded = jwtDecode(token);
  setUser(decoded); // change on user
}

/*useEffect ( ()=>{ // first refresh get localstorge and Decrypts
if(localStorage.getItem("userToken")){
  saveCurrentUser();
}
},[])*/
const router = createBrowserRouter([
  {      // Path User
    path:'/',
    element:<Layout />,    // opariton send child to perant is state manegar

    children:[    // any children see parent
    {
      path:'register',
      element:<Register/>,
     },
     {
      path:'login',
      element:<Login saveCurrentUser={saveCurrentUser} />, // send function on page login
     },
     {
      path:'send',
      element:<SendCode/>
    },
     {
      //=== path:'/', 
      index:true,// means path is empty
      element:<Home/>,
     },
     {
      path:'profile',
      element:
      <Guard>
        <Profile/>
      </Guard>,
      children:[
        {
          path:'info',
          element:<UserInfo/>
        },
        {
          path:'content',
          element:<UserContent/>
        }
      ]
     },
     {
      path:'categories',
      element:<Categories/>
     },
     {
      path:'products/category/:categoryId',
      element:<CategoriesDetails/>
     },
     {
      path:'/cart',
      element:<Cart/>
     },
     {
      path:'/prder',
      element:<Order/>
     },
     {
      path:'*',
      element:<h2>Page not Found</h2>,
     },
    ]
  },
  {      // Path Admin
    path:'/dashboard',
    element:<DashboardLayouts/>,

    children:[    // any children see parent
     {
      path:'home',
      element:<Homedashboard/>,
     },
     {
      path:'categories',
      element:<CategoriesDashboard/>
     },
    ] 
  }
]);


export default function App() {
  const [user,setUser] = useState(null);   // means null is user nont signin
  return (
    <UserContexProvider>
        <CartContextProvider>                  {/* as I can put it to component a specific level */}             
       {/**<OrderContextProvider> </OrderContextProvider> */} 
        <RouterProvider router={router} />
       
    </CartContextProvider>
    </UserContexProvider>
    
    
  )
}
