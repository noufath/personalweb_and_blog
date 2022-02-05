import React from 'react';
import { Route } from 'react-router-dom';

import Home from "./intro/Intro";
import Portfolio from "./portfolio/Portfolio";
// import Works from "./works/Works";
// import Testimonials from "./testimonials/Testimonials"
import Contacts from "./contact/Contact";
import PropTypes from 'prop-types';

class PersonalWebComponent extends React.Component {

    render() {
        // console.log(this.props.HideSection)
        
        if(this.props.HideSection) {
            return null;
        } else {
            return (
                <div className={"sections"}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/" component={Portfolio}/>

                    {/* <Route exact path="/"><Works/></Route> */}
                    {/* <Route exact path="/"><Testimonials/></Route> */}
                    <Route exact path="/"><Contacts/></Route>
                </div> 
            );
        }
    }
 
}

PersonalWebComponent.propTypes = {
    HideSection: PropTypes.bool
}

PersonalWebComponent.defaultProps = {
    HideSection: false
}


export default PersonalWebComponent;