import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import FeaturedPost from './FeaturedPost';
import MainFeaturedPost from './MainFeaturedPost';

export default function Main(props) {
    const { posts } = props;
    const [featuredBlog, setFeaturedBlog] = useState([]);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
                setFeaturedBlog(res.data[0]);
            }
            catch (err) {

            }
        }
        fetchData();
    }, []);

    return (
        <main>
            <MainFeaturedPost post={featuredBlog}/>
            <Grid container spacing={3}>
                {posts.map(post => (
                    <FeaturedPost key={capitalizeFirstLetter(post.title)} post={post} />
                ))}
            </Grid>

        </main>
        
      
    );
}

