import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TrashPage from '../pages/TrashPage';
import FavoritesPage from '../pages/FavoritesPage';
import SelectedPage from '../pages/SelectedPage';
export default function AppRoute() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/selected" element={<SelectedPage />} />
      </Routes>
  )
}
