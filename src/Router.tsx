import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import Login from './pages/Login';
import { DashboardAdmin } from './pages/DashboardAdmin';

export function Router() {
    return (
        <Routes >
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<DashboardAdmin />} />
        </Routes>
    )
}