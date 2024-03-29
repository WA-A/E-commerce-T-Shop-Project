import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContex } from '../Context/User';
import { CartContext } from '../Context/Cart';

export default function Navbar() {
  let {UserToken} = useContext(UserContex);
  let {count} = useContext(CartContext);
const navigate = useNavigate();
  const logout =()=>{
    localStorage.removeItem('userToken');
     //setUser(null); // delete information for user
    navigate('/home');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <a className="navbar-brand" href="#">T-shop</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
         
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>


          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>


          <li className="nav-item">
          <Link className="nav-link" href="/product">Products</Link>
        </li>
       
        {UserToken? (<li className="nav-item">                 {/*{user&&} */}
          <Link className="nav-link" to="/cart">Cart{count}</Link> 
          </li>
        ) : null}
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul className="dropdown-menu ">
       {UserToken == null?    // If there is no username, the page will consist of login
       <>
          <li><Link className="dropdown-item" to="/register">Register</Link></li>
          <li><Link className="dropdown-item" to="/login">Login</Link></li>
          </>: (// else the page will consist of profile
          <>
           <li><Link className="dropdown-item" to="/register">Profile</Link></li>
          <li><Link className="dropdown-item" to="/login">Logout</Link></li>
          </>
)}          
        </ul>
      </li>
        </ul>
     
      </div>
    </div>
  </nav>

  )
}
