import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import { notification } from 'antd'

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();

    const { isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: "Success",
                description: message
            })
        }
        if (isError) {
            notification.error({
                message: "Error",
                description: message
            })
        }
        dispatch(reset())
    }, [isSuccess, isError, message]);

    const onChange = (e)=>{
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            return notification.error({
              message: "Error",
              description: "Passwords do not match"
            });
        } else {
            return dispatch(register(formData))
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" value={name} onChange={onChange} />
            <input type="email" name="email" value={email} onChange={onChange}/>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={onChange}
            />
            <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
            />
            <button type="submit">Register</button>
        </form>
    )
};

export default Register