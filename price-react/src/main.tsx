import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PricingSection from './PricingSection'
import './index.css'

const rootId = 'pricing-react-root';
const rootElement = document.getElementById(rootId);

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <PricingSection />
    </StrictMode>,
  )
} else {
  // Fallback for development within the React app itself
  const devRoot = document.getElementById('root');
  if (devRoot) {
    createRoot(devRoot).render(
      <StrictMode>
        <PricingSection />
      </StrictMode>,
    )
  }
}
