import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { authenticate, getUser } from "../services/authorize"
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {

    const [state, setState] = useState({
        username: "admin",
        password: "admin123"
    })

    const { username, password } = state

    const inputValue = name => event => {
        // การทำงานของ operator spread (...state) ในนี้คือการสร้าง object ใหม่ที่มี properties ทั้งหมดจาก 
        // state และทำการ overwrite ค่าของ property ที่มีชื่อตรงกับ name ด้วย event.target.value
        //Example
        // let oldState = { title: "Old Title", content: "Old Content" };
        // let newState = { ...oldState, author: "New Author" };
        // 
        // output=>: { title: "Old Title", content: "Old Content", author: "New Author" }
        setState({ ...state, [name]: event.target.value })
    }

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault()
        axios
            .post(process.env.REACT_APP_API + '/login', { username, password })
            .then(response => {
                console.log(response)
                authenticate(response, () => navigate("/create"))
            }).catch(err => {
                Swal.fire(
                    'แจ้งเตือน!',
                    err.response.data.error,
                    'error'
                )
            })
    }

    useEffect(()=>{
        getUser() && navigate("/")
        // eslint-disable-next-line
    },[])

    return (

        <div className="container p-5">
            <NavbarComponent />
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={inputValue("username")} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={inputValue("password")} />
                </div>
                <br />
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
            </form>
        </div>
    )
}
export default LoginComponent