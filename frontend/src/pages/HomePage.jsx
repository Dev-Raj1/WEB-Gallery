import React from 'react'
import Product from '../components/Product'
import { Link } from 'react-router'
const HomePage = () => {
  return (
    <>
    <h1>HomePage</h1>
    <Link to="/create">Create Product</Link>
    <section>
        <Product/>
    </section>
    </>
  )
}

export default HomePage
