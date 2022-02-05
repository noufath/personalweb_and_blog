import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Main from './Main';



export default function Blog() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
                setBlogs(res.data);
            }
            catch (err) {

            }
        }
        fetchBlogs();
    }, []);

    return (
        <Main posts={blogs}/>
    );
}