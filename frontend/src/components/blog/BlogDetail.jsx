import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const BlogDetail = (props) => {
    const [PostDetail, setPostDetail] = useState({});

    useEffect(() => {
        const slug = props.match.params.id;
        
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`);
                setPostDetail(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [props.match.params.id]);

    const createBlog = () => {
        return {__html: PostDetail.content}
    };

    const CapitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <Box mt={4}>
                <Typography variant="h4">
                    {CapitalizeFirstLetter(PostDetail.title)}
                </Typography>
                
                <Typography variant="subtitle1">
                    {dateFormat(PostDetail.date_created, "mmm dS, yyyy")}
                </Typography>

                <Typography mt={3} paragraph gutterBottom>
                    <span align='justify' dangerouslySetInnerHTML={createBlog()}/>
                </Typography>
                
                
                <Link to='/blog' color="primary" underline="none">Back to Blog</Link>
            

            
        </Box>
    );

};

export default BlogDetail;