import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import Link from '@mui/material/Link';
import dateFormat from 'dateformat';


function FeaturedPost(props) {
    const { post } = props;

    return (

        <Grid item xs={12} md={6}>
            <CardActionArea>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex:1 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            <Link href={`/blog/category/${post.cat_title_id}`} color="primary" underline="hover">{post.cat_title}</Link>
                        </Typography>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {dateFormat(post.date_created, "mmm dS, yyyy")}
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
                        image={ post.thumbnail }
                        alt={post.slug}
                    />
                    
                </Card>
            </CardActionArea>
            
                
           
        </Grid>
    );
}


export default FeaturedPost;