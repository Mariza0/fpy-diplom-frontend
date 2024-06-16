import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
// import { StoragePage } from './pages/StoragePage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="api" element={<LoginPage/>}/>
          <Route index element={<Home />} />
          {/* <Route path="storage" element={<StoragePage />}/> */}
          <Route path="storage/users" element={<AdminPage />}/>
          <Route path="storage/users/:userId" element={<UserDetailPage />} />
          <Route path="register" element={<RegisterPage />}/>
          <Route path="*" element={<NotFoundPage />} /> {/* Маршрут для страницы 404 */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
