import "./menu.scss";



export default function Menu({ menuOpen, setMenuOpen }) {
   
    const listmenu = [
        {
            id: 1,
            hastag: "home",
            title: "Home",
            
        },
        {
            id: 2,
            hastag: "portfolio",
            title: "Portfolio",
            
        },
        /*{
            id: 3,
            hastag: "works",
            title: "Works",
            
        },
        {
            id: 4,
            hastag: "testimonials",
            title: "Testimonials",
            
        },
        */
        {
            id: 6,
            hastag: "contact",
            title: "Contact",
            
        },
    ]
    return (
        <div className={"menu " + (menuOpen && "active")} id="menu">
            <ul>
                {listmenu.map((item) => (
                    <li key={item.id} onClick={()=>setMenuOpen(false)}>  
                        <a href={"/#" + item.hastag}>{item.title}</a>
                        
                    </li>
                ))}
               
            </ul>
            
        </div>
    );
}
