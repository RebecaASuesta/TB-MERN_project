import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login, reset } from "../../features/auth/authSlice"
import { notification, Form, Input, Button } from "antd"
import "../Login/Login.scss"

const Login = () => {
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
            }, 1000)
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onFinish = (values) => {
        dispatch(login(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <Form className="form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item className="input"
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Introduce tu email, un poquito de por favor!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="input"
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Introduce tu contraseña, un poquito de por favor!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className="ItemButton" wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
            <div className="text">
                <p>¿Todavía no vives aquí?</p>
                <Link to="/register">¡Múdate con nosotr@s!</Link>
            </div>
        </div>
    )
}

export default Login