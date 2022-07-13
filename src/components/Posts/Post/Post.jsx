import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset, create, like, dislike, deletePost, getById } from "../../../features/posts/postsSlice"
import { notification, Form, Input, Button } from "antd"
import "antd/dist/antd.css"
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import EditModal from "./EditPost/EditPost"
import "../Post/Post.scss"

const { TextArea } = Input;

const Post = (_id) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { posts, isError, isSuccess, message } = useSelector((state) => state.posts);
    
    const { user } = useSelector((state) => state.auth);

    const [isModalVisible, setIsModalVisible] = useState(false);

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
                navigate("/profile");
            }, 1000)
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onFinish = (values) => {
        dispatch(create(values));
        navigate("/profile");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = (_id) => {
        dispatch(getById(_id));
        setIsModalVisible(true)
    };

    const post = posts?.map((post) => {
        const isMyPost = post.userId == user.user._id;
        const isLiked = post.likes.includes(user.user._id);
        const isDisliked = post.dislikes.includes(user.user._id);
        return (
            <div className="post" key={post._id}>
                <Link to={"/posts/id/" + post._id}>
                    <p>{post.title}</p>
                </Link>
                <span>
                    {
                        isLiked ?
                            <>
                                <LikeFilled /> &nbsp;
                                <DislikeOutlined />
                            </>
                            :
                                isDisliked ?
                                <>
                                    <LikeOutlined /> &nbsp;
                                    <DislikeFilled />
                                </>
                                :
                                <>
                                    <LikeOutlined onClick={() => dispatch(like(post._id))} /> &nbsp;
                                    <DislikeOutlined onClick={() => dispatch(dislike(post._id))} />
                                </>
                    }
                </span>
                <span>
                    {
                        isMyPost ?
                            (<>
                                &nbsp; &nbsp;
                                <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} /> &nbsp;
                                <EditOutlined onClick={() => showModal(post._id)} />
                            </>) : ""
                    }
                </span>

            </div>
        )
    });

    return (
        <>
            <div className="createPost">
                <h2>Publica un acta</h2>
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
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Introduce un título, un poquito de por favor!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="input"
                        label="Descripción"
                        name="body"
                        rules={[{ required: true, message: 'Introduce una descripción, un poquito de por favor!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item className="ItemButton" wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Publicar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <h2>Lista de actas</h2>
            <div className="postList">{post}</div>
            <span>
                <EditModal visible={isModalVisible} setVisible={setIsModalVisible} />
            </span>
        </>
    )
}

export default Post