import React from 'react'
import ReactDOM from 'react-dom/client'
import '../design-system/styles/variables.css'
import './styles.css'
import '../design-system/styles/typography.css'
import '../design-system/styles/effects.css'
import App from './App'

// Preserve the site's existing 800px layout breakpoint for Figma's Mobile mode.
const responsive = window.matchMedia('(max-width: 800px)')
const syncMode = () => { document.documentElement.dataset.dsResponsive = responsive.matches ? 'mobile' : 'desktop' }
document.documentElement.dataset.ds = 'portfolio'
syncMode()
responsive.addEventListener('change', syncMode)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
