import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logoff = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, []);

    function logout() {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        auth.signout(() => {
            navigate("/");
        });
    }

    return null;
};

export default Logoff;