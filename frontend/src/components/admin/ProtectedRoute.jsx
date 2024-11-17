import React, { useEffect } from "react"; // Use named imports
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            navigate("/");
        }
    }, [user, navigate]); // Include user and navigate in the dependency array

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
