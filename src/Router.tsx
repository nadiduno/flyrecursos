import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import { Login } from './pages/login';
import { CriarConta } from './pages/CriarConta';

export function Router() {
    return (
        <Routes >
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/criarconta' element={<CriarConta />} />
        </Routes>
    )
}