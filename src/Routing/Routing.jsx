import React from 'react'
import Layout from '../Components/Layout';
import Dashboard from '../Components/Dashboard/Dashboard';
import Products from '../Components/Products';
import Login from '../Components/Login';
import { Route, Routes } from 'react-router-dom';
import Orders from '../Components/Orders/Orders';
import Customers from '../Components/Customers';
import Transactions from '../Components/Transactions';
import Messages from '../Components/Messages';
import LogOut from '../Components/LogOut';
import Settings from '../Components/Settings';
import Support from '../Components/Support';

const Routing = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Dashboard/>}></Route>
              <Route path="products" element={<Products/>}></Route>
              <Route path="orders" element={<Orders/>}></Route>
              <Route path="customers" element={<Customers/>}></Route>
              <Route path="transactions" element={<Transactions/>}></Route>
              <Route path="messages" element={<Messages/>}></Route>
              <Route path="settings" element={<Settings/>}></Route>
              <Route path="support" element={<Support/>}></Route>
            </Route>
            <Route path='/'>
              <Route path="login" element={<Login/>}></Route>
              <Route path="/logOut" element={<LogOut/>}></Route>
            </Route>
        </Routes>
    </div>
  )
}

export default Routing;