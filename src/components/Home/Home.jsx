import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Home</h1>
            <input onKeyUp={handleChange} placeholder="search post" name="text" />
        </div>
    )
}
  
export default Home