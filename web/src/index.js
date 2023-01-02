import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchRecipes } from './features/recipes/recipesSlice';

store.dispatch(fetchRecipes());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
