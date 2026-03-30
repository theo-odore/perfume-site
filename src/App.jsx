import React from 'react'
import Hero from './components/Hero/Hero'
import Ingredients from './components/Ingredients/Ingredients'
import Scents from './components/Scents/Scents'
import Product from './components/Product/Product'
import Lifestyle from './components/Lifestyle/Lifestyle'
import './App.css'

function App() {
  return (
    <div className="App">
      <Hero />
      <Ingredients />
      <Scents />
      <Product />
      <Lifestyle />
    </div>
  )
}

export default App
