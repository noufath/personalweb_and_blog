import PortfolioList from "../portfoliolist/PortfolioList"
import "./portfolio.scss"
import React, { useEffect, useState } from "react";
//import {
//    featuredPortfolio,
//    webPortfolio,
//    mobilePortfolio,
//} from "../../data";
import axios from "axios";



export default function Portofolio() {
    const [selected, setSelected] = useState(1);
    const [data, setData] = useState([]);
    const [pfcates, setPfcates] = useState([]);
    
    //const list = [
    //    {
    //        id: "featured",
    //       title: "Featured",
    //    },
    //    {
    //        id: "web",
    //        title: "Web App",
    //    },
    //    {
    //        id: "mobile",
    //        title: "Mobile App",
    //    },
    //];

    useEffect(() => {
     
        const fetchListCates = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/portofolio_category/`);
                setPfcates(res.data);
            }
            catch (err) {

            }
        }

        fetchListCates();
    }, []);


    useEffect(() => {
        //switch (selected) {
            // case "featured":
            //    setData(featuredPortfolio);
            //    break;
            // case "web":
            //     setData(webPortfolio);
            //     break;
            // case "mobile":
            //    setData(mobilePortfolio);
            //    break;
            //default:
            //    setData(featuredPortfolio);
        //}
      

        const porto_cat_id = selected;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/portofolios/`, { porto_cat_id }, config );
                setData(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [selected]);

    return (
        <div className="portofolio" id="portfolio">
            <h1>Portfolio</h1>
            <ul>
                {pfcates.map((item) => (
                    <PortfolioList
                        key={item.id}
                        title={item.port_cat_name}
                        active={selected === item.id}
                        setSelected={setSelected}
                        id={item.id}
                    />
                ))}
            </ul>
            <div className="container">
                {data.map((d) => ( 
                    <div key={d.id} className="item">
                        <h3>{d.porto_title}</h3>
                        <img
                            src={d.porto_thumbnail}
                            alt=""
                        />
                        
                    </div>
                    
                ))}
            </div>
        </div>
    );
}
