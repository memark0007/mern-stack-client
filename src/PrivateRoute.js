import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUser } from "./services/authorize";

const PrivateRoute = ({ children }) => {
    const [auth, setAuth] = useState(null);
  
    useEffect(() => {
        let user = getUser();
        setAuth(user ? true : false);
    }, []);
  
    if(auth === null) {
        return <div>Loading...</div>;  // หรือใช้การแสดงผลของโหลดอื่น ๆ
    } else if (auth === true) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
  }

export default PrivateRoute;
