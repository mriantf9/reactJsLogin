import { Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './Components/ProtectedRoute';

const router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
export default router;