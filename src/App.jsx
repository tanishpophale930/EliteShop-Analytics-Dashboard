import React from 'react'
import Layout from './Components/Layout'
import Dashboard from './Components/Dashboard/Dashboard';
import Products from './Components/Products';
import Login from './Components/Login';
import { Route, Router, Routes } from 'react-router-dom';
import Routing from './Routing/Routing';

const App = () => {
  return (
    <div>
        <Routing/>
    </div>
  )
}

export default App