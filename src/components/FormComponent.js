import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser, getToken } from "../services/authorize";

const FormComponent = () => {
    //  ฟังก์ชันนี้รับค่าเริ่มต้นของ state และ return array ที่มีสอง elements: ค่าปัจจุบันของ state และ function ที่ใช้สำหรับอัปเดต state ดังนั้นเราสามารถใช้ array destructuring ([count, setCount]) เพื่อแยก elements ทั้งสองออกมาจาก array
    const [state, setState] = useState({
        title: "",
        author: getUser()
    })

    //ใช้ destructuring ในการรับค่า title, content, author จาก state
    const { title, author } = state

    const [content, setContent] = useState("")

    //กำหนดค่าให้กับ State 
    //เขียน function ซ้อน function รูปแบบใหม่
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

    const submitContent = (event) => {
        setContent(event)
    }

    const submitForm = (e) => {
        e.preventDefault()
        // console.table({title, content, author})
        // console.log("API URL", process.env.REACT_APP_API)
        axios
            .post(process.env.REACT_APP_API + "/create",
                { title, content, author },
                {
                    headers: {
                        authorization: "Bearer " + getToken()
                    }
                }
            )
            .then(Response => {
                Swal.fire(
                    'แจ้งเตือน!',
                    'บันทึกข้อมูลเรียบร้อย!',
                    'success'
                )
                setState({ ...state, title: "", author: "" })
                setContent('')
            }).catch(err => {
                Swal.fire(
                    'แจ้งเตือน!',
                    err.response.data.error,
                    'error'
                )
            })
    }

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เขียนบทความ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={inputValue("title")} />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{ border: "1px solid" }}
                    />

                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text"
                        className="form-control"
                        value={author}
                        onChange={inputValue("author")} />
                </div>
                <br />
                <input type="submit" value="บันทึก" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default FormComponent;