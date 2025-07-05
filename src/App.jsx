import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import SortingVisualizer from './SortVis/SortingVisualizer'
import ConceptPage from './SortVis/ConceptPage';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<SortingVisualizer />} />
        <Route path='/concept/:algo' element={<ConceptPage />} />
      </Routes>
    </div>
  )
}

export default App
