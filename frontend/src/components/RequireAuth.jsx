import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
    /*const auth = useAuth(); // Tu lógica de autenticación aquí
    const location = useLocation();

    if (!auth.user) {
        // Redirige a la página de login, pero guarda la ubicación actual
        return <Navigate to="/login" state={{ from: location }} replace />;
    }*/

    return children;
}