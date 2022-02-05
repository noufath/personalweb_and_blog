import "./portfoliolist.scss"

export default function portfoliolist({ id, title, active, setSelected }) {
    return (
        <li key={id}
            className={active ? "portfoliolist active" : "portfoliolist"} 
            onClick={()=>setSelected(id)}
        >
            {title}
        </li>
    )
}
