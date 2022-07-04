import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from "../../features/auth/authSlice"
import { notification } from "antd"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const dispatch = useDispatch();
  
    const { isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            notification.error({ 
                message: "Error",
                description: message
            })
        }
        if (isSuccess) {
            notification.success({
                message: "Success",
                description: message
            });
            setTimeout(() => {
                navigate("/");
            }, 2000)
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e)=>{
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData))
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange}/>
            <input type="password" name="password" value={password} onChange={onChange}/>
            <button type="submit">Log in</button>
        </form>
    )
};

export default Login