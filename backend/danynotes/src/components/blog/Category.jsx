import React, { useState, useEffect} from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import axios from 'axios';


const Category = (props) => {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        const cat_title_id = props.match.params.cat_title_id;
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/category`, { cat_title_id }, config);
                setBlogs(res.data);

            }
            catch (err) {

            }
        };

        fetchData();

    }, [props.match.params.cat_title_id]);


    const CapitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    
    return (

        <Grid container spacing={3}>
            {blogs.map(post => (
                <Grid item xs={12} md={6} key={post.id}>
                    <CardActionArea>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex:1 }} >
                                <Typography variant="subtitle1" color="text.secondary">
                                    <Link href={`/blog/category/${post.cat_title_id}`} color="primary" underline="hover">{post.cat_title}</Link>
                                </Typography>
                                <Typography component="h2" variant="h5">
                                    {CapitalizeFirstLetter(post.title)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {post.month} {post.day}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {post.excerpt}
                                </Typography>
                                        
                                <CardActions>
                                    <Link href={`/blog/blogdetail/${post.slug}`} color="primary" underline="none">Continue reading...</Link>
                                </CardActions>
                            </CardContent>   
                            <CardMedia
                                component="img"
                                sx={{ width: 200, heigth: 250, display: { xs: 'none', sm: 'block' } }}
                                image= {post.thumbnail} 
                                alt={post.slug}
                            />
                                    
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
            
    )
};

export default Category;
