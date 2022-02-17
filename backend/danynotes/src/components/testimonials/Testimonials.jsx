import './testimonial.scss'
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function Testimonials() {

    /*
    const data = [
        {
          id: 1,
          name: "Tom Durden",
          title: "Senior Developer",
          img:
            "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          icon: "assets/twitter.png",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam dolorem.",
        },
        {
          id: 2,
          name: "Alex Kalinski",
          title: "Co-Founder of DELKA",
          img:
            "https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          icon: "assets/youtube.png",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam dolorem recusandae perspiciatis ducimus vel hic temporibus. ",
          featured: true,
        },
        {
          id: 3,
          name: "Martin Harold",
          title: "CEO of ALBI",
          img:
            "https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          icon: "assets/linkedin.png",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam dolorem",
        },
    ];

    */

    const regex = /(<([^>]+)>)/ig;
    

    const RemoveHtmlTag = (word) => {
        if (word)
            return word.replace(regex, '');
        return '';
    };


    const [testimony, setTestimony] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/testimonial/`);
          setTestimony(resp.data);
        }
        catch (err) {

        }
      }
      fetchData();
  }, []);


    return (
        <div className="testimonials" id="testimonials">
            <h1>Testimonials</h1>
            <div className="container">
                {testimony.map((d) => ( 
                    <div key={d.id} className={d.testimonial_featured ? "card featured" : "card"}>
                        <div className="top">
                            <img src="assets/right-arrow.png" className="left" alt=""/>
                            <img className="user"
                                src={d.testimonial_img}
                                alt="" 
                            />
                            <img className="right" src={d.testimonial_icon} alt="" />
                        </div>
                        <div className="center">
                            {RemoveHtmlTag(d.testimonial_desc)}
                        </div>
                        <div className="bottom">
                            <h3>{d.testimonial_name}</h3>
                            <h3>{d.testimonial_title}</h3>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

