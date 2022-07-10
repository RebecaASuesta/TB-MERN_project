import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { reset, create, like, dislike } from "../../../features/posts/postsSlice"
import { notification } from "antd"
import "antd/dist/antd.css"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"

const Post = (likes, _id) => {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })

    const { title, body } = formData;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { posts, user, isError, isSuccess, message } = useSelector((state) => state.posts);

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
                navigate("/posts");
            }, 2000)
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(create(formData));
        e.target.title.value = "";
        e.target.body.value = ""
    };

    const post = posts?.map((post) => {
        const isAlreadyLiked = post.likes?.includes(user?.user._id)
        return (
            <div className="post" key={post._id}>
                <Link to={"/posts/id/" + post._id}>
                    <p>{post.title}</p>
                </Link>
                <span>Likes: {post.likes?.length}</span>
                    {isAlreadyLiked ? (
                        <HeartFilled onClick={() => dispatch(dislike(post._id))} />
                    ) : (
                        <HeartOutlined onClick={() => dispatch(like(post._id))} />
                    )}
            </div>
        )
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" value={title} onChange={onChange} />
                <input type="text" name="body" value={body} onChange={onChange} />
                <button type="submit">Publicar</button>
            </form>
            <div>{post}</div>
        </>
    )
}

export default Post