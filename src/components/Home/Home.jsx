import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import "../Home/Home.scss"

const Home = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
        if (e.key === "Enter") {
            navigate('/search/' + text);
        }
    };

    return (
        <div className='home'>
            {user ?
                <div className='search'>
                    <h2>Busca aquí las actas</h2>
                    <input onKeyUp={handleChange} placeholder="Buscar..." name="text" />
                </div>
                :
                <div className='noSearch'>
                    <h2><Link to="/login">Entra </Link> para ver las actas</h2>
                    <h3>y, si todavía no formas parte de ésta nuestra comunidad, <Link to="/register">múdate</Link></h3>
                </div>
            }
        </div>
    )
}
  
export default Home