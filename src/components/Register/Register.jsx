import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { notification, Form, Input, Button } from 'antd'
import "../Register/Register.scss"

const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: "Success",
                description: message
            });
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        }
        if (isError) {
            notification.error({
                message: "Error",
                description: message
            })
        }
        dispatch(reset())
    }, [isSuccess, isError, message, navigate]);

    const onFinish = (values) => {
        dispatch(register(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };

    return (
        <div className="register">
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
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Introduce tu nombre, un poquito de por favor!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="input"
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Introduce tu email, un poquito de por favor!' },
                        {
                            type: 'email', message: 'Introduce un email válido, un poquito de por favor!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="input"
                    label="Contraseña 1"
                    name="password"
                    rules={[{ required: true, message: 'Introduce tu contraseña, un poquito de por favor!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className="input"
                    label="Contraseña 2"
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Introduce tu contraseña, un poquito de por favor!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                              }
            
                              return Promise.reject(
                                new Error(
                                    'Introduce la misma contraseña, un poquito de por favor!'
                                )
                              );
                            },
                          }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className="ItemButton" wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Múdate
                    </Button>
                </Form.Item>
            </Form>
            <div className="text">
                <p>¿Ya eres vecin@?</p>
                <Link to="/login">¡Entra a casa!</Link>
            </div>
        </div>
    )
};

export default Register