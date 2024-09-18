import React from 'react'
import{ useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
//import { useSelector } from 'react-redux'
import authService from './appwrite/auth'
import  {login,logout} from "./store/authSlice"
import {Footer,Header} from './components/index'
import {Outlet} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

function App() {
 //whenever want to talk to DBMS or network just useState
const [ loading, setLoading]=useState(true);
const dispatch= useDispatch();
const navigator=useNavigate();


useEffect(() => {
  authService
    .getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    })
    // .catch((error) =>{throw error.message})
    .finally(() => setLoading(false));
}, []);
useEffect(()=>{
  window.addEventListener("load", (event) => {
    authService.logout().then(()=>{
      dispatch(logout())
      navigator("/")
    })
    
  });
})


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block border border-slate-500 shadow-sm shadow-slate-500'>
        <Header/>
        <main>
          <Outlet/>   
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
