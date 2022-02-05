import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Blog from './blog/Blog'
import Category from './blog/Category';
import BlogDetail from './blog/BlogDetail';
import Header from './blog/Header';
import Footer from './blog/Footer';



const BlogWebComponent = (props) => {

    const [sectionBlog, setSectionBlog] = useState([]);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/list_category/`);
                setSectionBlog(res.data)
            }
            catch (err) {

            }
        }
        fetchSection();

    }, []);

    
    const theme = createTheme();

    if(props.HideBlog) {
        return null;
    }
    else {
        return (
            
            <div className="blog">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container maxWidth="lg" sx={{ overflow: 'hidden'}}>
                        <Header title="Blog" sections={sectionBlog}/>
                            
                        <Route exact path='/blog' component={Blog}/>
                        <Route exact path='/blog/category/:cat_title_id' component={Category}/>
                        <Route exact path='/blog/blogdetail/:id' component={BlogDetail}/>
                        
                    </Container>
                    <Footer
                        title="Footer"
                        description="Something here to give the footer a purpose!"
                    />
                </ThemeProvider>          
            </div>
                
        );
    }
 
}

BlogWebComponent.propTypes = {
    HideBlog: PropTypes.bool
}

BlogWebComponent.defaultProps = {
    HideBlog: true
}

export default BlogWebComponent;