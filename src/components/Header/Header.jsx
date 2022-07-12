import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { useState } from "react"
import "../Header/Header.scss"

const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
        if (e.key === "Enter") {
            navigate('/search/' + text)
        }
    };

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/")
    };

    return (
        <header>
            {user ?
                <>
                    <span><Link to="/"> Buscar </Link></span>
                    <span><Link to="/posts"> Actas </Link></span>
                    <span><Link to="/profile"> {user.user.name} </Link> </span>
                    <span><Link to="/" onClick={onLogout}> Salir </Link></span>
                </>
                :
                <>
                    <span><Link to="/login"> Entrar </Link></span>
                    <span><Link to="/register"> Múdate </Link></span>
                </>
            }
        </header>
    )
};

export default Header