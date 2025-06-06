import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Journey from '@/pages/Journey'
import Shop from '@/pages/Shop'
import Checkout from '@/pages/Checkout'
import Contact from '@/pages/Contact'
import Resources from '@/pages/Resources'
import ResourceArticle from '@/pages/ResourceArticle'
import SignIn from '@/pages/SignIn'
import AuthCallback from '@/pages/AuthCallback'
import PrivateRoute from '@/components/PrivateRoute'
import { ThemeProvider } from '@/contexts/ThemeContext'
import LoadingScreen from '@/components/LoadingScreen'

function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoadingDone(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      {!loadingDone ? (
        <LoadingScreen isDarkMode={true} onFinish={() => setLoadingDone(true)} />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/articles/:slug" element={<ResourceArticle />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      )}
    </ThemeProvider>
  )
}

export default App
