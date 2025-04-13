import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import Login from './pages/Login';

export function Router() {
    return (
        <Routes >
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/criarconta' element={<CriarConta />} /> */}
        </Routes>
    )
}