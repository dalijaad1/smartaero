import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmartAero",
              "url": "https://smartaero.tech",
              "logo": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
              "description": "SmartAero provides innovative IoT solutions for agriculture and home automation.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Route de Réjiche",
                "addressLocality": "Mahdia",
                "postalCode": "5121",
                "addressCountry": "TN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+216-26531980",
                "contactType": "customer service",
                "email": "mohamedali.jaadari@gmail.com"
              }
            }
          `}
        </script>
      </Helmet>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)