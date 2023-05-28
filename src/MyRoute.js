import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import FormComponent from './components/FormComponent';
import SingleComponent from './components/SingleComponent';
import EditComponent from './components/EditComponent';
import LoginComponent from './components/LoginComponent';
import PrivateRoute from "./PrivateRoute";


const MyRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={
          <PrivateRoute>
            <FormComponent />
          </PrivateRoute>
        } />
        <Route path="/blog/:slug" element={<SingleComponent />} />
        <Route path="/blog/edit/:slug" element={
          <PrivateRoute>
            <EditComponent />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </Router>
  );
}

export default MyRoute;
