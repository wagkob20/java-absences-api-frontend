import React from 'react';
import './App.css';
import Login from "./components/Login";
import Liste from "./components/Liste";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import FehlstundenForm from "./components/FehlstundenForm";
import AuthProvider from "./logic/AuthContext";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={'/login'} element={<Login/>}></Route>
                        <Route path={'/register'} element={<Register/>}></Route>
                        <Route path={'/studentlist'} element={<Liste/>} ></Route>
                        <Route path={'/changeFehlstunden'} element={<FehlstundenForm/>} ></Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
