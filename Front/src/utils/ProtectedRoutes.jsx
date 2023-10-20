import { Navigate, Outlet } from "react-router-dom"

//Con el objetivo de proteger las rutas, react router dom me permite hacerlo con el Navigate
//para mandar al usuario al login o Outlet para navegar normalmente

const ProtectedRoutes = ({ isLoggedIn, redirectPath = "/login" }) => {
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}

export default ProtectedRoutes;