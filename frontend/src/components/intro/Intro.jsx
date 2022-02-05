import "./intro.scss";
import axios from "axios";
import { init } from 'ityped';
import React, { useState, useEffect, useRef } from "react";



export default function Intro() {

    const [profile, setProfile] = useState([]);
    const [displayedContent, setDisplayedContent] = useState("");
    
  
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const fullres = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/profile/`);
                setProfile(fullres.data[0].arr_worktitle);
                
            }
            catch (err) {

            }
        }
        fetchProfile();
    }, []);

   

    useEffect(() => {
        setDisplayedContent((displayedContent)=> displayedContent + profile) 
    }, [profile]);


    const textRef = useRef();

    useEffect(() => {
        const strings = [displayedContent]

        init(textRef.current, {
            showCursor: false,
            typeSpeed: 20,
            backDelay: 1500,
            backSpeed: 60,
            strings: [strings],
        });
    }, [displayedContent]);
 
    return (
        <div className="intro" id="home">
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/man.png" alt="" />
                </div>
            </div>

            <div className="right">
                <div className="wrapper">
                    <h2>Hi There, I',m</h2>
                    <h1>Dany Christianto</h1>
                    <h3>
                        Freelance <span ref={textRef}></span>
                        
                    </h3>
                </div>

                <a href="#portfolio">
                    <img src="assets/down.png" alt="" />
                </a>
            </div>
        </div>
    );


}

