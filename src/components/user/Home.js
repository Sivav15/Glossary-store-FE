import React, { useEffect } from 'react'
import Feature from './feature';
import Categories from './categories';
import Customer from './customer';
import Contact from './contact';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/slice/user/productReducer';
function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProduct({
      category : "",
      search : "",
    })) 
  },[])
  return (
    <>
    <Categories/>
    <Feature/>
    <Customer/>
    <Contact/>
    <Footer/>

    </>
  )
}

export default Home