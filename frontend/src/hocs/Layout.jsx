import React, { useEffect, useState } from 'react';
import Menu from "../components/menu/Menu";
import PersonalWebComponent from '../components/PersonalWebComponent';
import BlogWebComponent from '../components/BlogWebComponent';
import { Link } from 'react-router-dom';
import "../app.scss";
import "../components/topbar/topbar.scss";



const Layout = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [LinkClicked, setLinkClicked] = useState(false);
    const [HideSection, setHideSection] = useState(false);
    const [HideBlog, setHideBlog] = useState(true);


    // persist state on refresh, Using LocalStorage — Functional Components

    useEffect(() => {
        setHideSection(JSON.parse(window.localStorage.getItem('HideSection')));
        setLinkClicked(JSON.parse(window.localStorage.getItem('LinkClicked')));
        setHideBlog(JSON.parse(window.localStorage.getItem('HideBlog')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('HideSection', HideSection);
        window.localStorage.setItem('LinkClicked', LinkClicked);
        window.localStorage.setItem('HideBlog', HideBlog);
    }, [HideSection, LinkClicked, HideBlog]);

    return (
        
        <div className="app">
            
            
            <div className={"topbar " + (menuOpen && "active") } id="topbar">
                <div className="wrapper">
                    <div className="left">
                        <Link to="/" className="logo" onClick={() => { setMenuOpen(false); setLinkClicked(false); setHideSection(false); setHideBlog(true) }}>genius.</Link>
                    </div>
                    
                    <div className="right">

                        <div className={"linkmenu " + (LinkClicked && "clicked")}>
                            <Link to="/blog" className="linkto" onClick={() => { setLinkClicked(true); setHideSection(true); setHideBlog(false) } }>Blog</Link>
                        </div>
                        
                        <div className="hamburger" onClick={() => { setMenuOpen(!menuOpen);setLinkClicked(false); setHideSection(false); setHideBlog(true) }}>
                            <span className="line1"></span>
                            <span className="line2"></span>
                            <span className="line3"></span>
                        </div>
    
                        
                    </div>
                </div>
            </div>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            
            <PersonalWebComponent HideSection={HideSection}/>
            
            {props.children}

            <BlogWebComponent HideBlog={HideBlog}/>
            
            
        </div>

        
    );
}





export default Layout;