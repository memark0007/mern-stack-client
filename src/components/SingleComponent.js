import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from "./NavbarComponent";
import { Parser } from 'html-to-react'

const SingleComponent = () => {
    const [blog, setBlog] = useState('')

    const { slug } = useParams()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${slug}`)
            .then(response => {
                setBlog(response.data)
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container p-5'>
            <NavbarComponent />
            {blog && <div>
                <h1>{blog.title}</h1>
                <div className='pt-3'>{Parser().parse(blog.content)}</div>
                <p className='text-muted'>ผู้เขียน: {blog.author} , เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
            </div>}
        </div>
    )
}

export default SingleComponent