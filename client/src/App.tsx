import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { UsersPage } from './features/users/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersPage />} />

        <Route
          path="/"
          element={<Navigate to="/users" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;