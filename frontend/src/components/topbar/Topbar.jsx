import React, { useState } from 'react';
import "./topbar.scss";
import { Link } from 'react-router-dom';




export default function Topbar ({ menuOpen, setMenuOpen}) {
    const [LinkClicked, setLinkClicked] = useState(false)
    const [setHideSection] = useState(false)

    return (
        
        <div className={"topbar " + (menuOpen && "active") } id="topbar">
            <div className="wrapper">
                <div className="left">
                    <Link to="/" className="logo" onClick={() => { setMenuOpen(false); setLinkClicked(false); setHideSection(false) }}>genius.</Link>
                </div>
                
                <div className="right">

                    <div className={"linkmenu " + (LinkClicked && "clicked")}>
                        <Link to="/blog" className="linkto" onClick={() => { setLinkClicked(!LinkClicked); setHideSection(true) } }>Blog</Link>
                    </div>
                    
                    <div className="hamburger" onClick={() => { setMenuOpen(!menuOpen) }}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
 
                    
                </div>
            </div>
        </div>
    )
}
