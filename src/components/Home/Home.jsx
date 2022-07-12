import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Home/Home.scss"

const Home = () => {

    const navigate = useNavigate();

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
        if (e.key === "Enter") {
            navigate('/search/' + text);
        }
    };

    return (
        <div className='home'>
            {/* <h1>Home</h1> */}
            <input onKeyUp={handleChange} placeholder="Buscar..." name="text" />
        </div>
    )
}
  
export default Home