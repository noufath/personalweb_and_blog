import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import "./header.scss";


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


const Header = (props) => {
    const { sections } = props;
    
    const history = useHistory();
    const handleClickBlogHome = () => {
        history.push('/blog')
    };

    const CapitalizeFirstLetter = (word) => {
        if (word) 
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    }; 
  
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx = {{
                        justifyContent: 'space-between',
                        overflowX: 'auto'
                    }}
                >
                    <IconButton
                        size="small"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClickBlogHome}
                    >
                        <HomeIcon />
                    </IconButton>
                    
                        {sections.map((section) => (
                            <Link
                                underline="none" 
                                color="inherit"
                                noWrap
                                key={section.id}
                                variant="body2"
                                href={`/blog/category/${section.id}`}
                                sx={{ p: 1, flexShrink: 0}}
                                
                            >
                                {CapitalizeFirstLetter(section.cat_title)}
                            </Link>

                            
                        ))}
                    
                </Toolbar>
            </Box>
        </React.Fragment>
    );
}
  
Header.propTypes = {
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        cat_title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};
  
export default Header;