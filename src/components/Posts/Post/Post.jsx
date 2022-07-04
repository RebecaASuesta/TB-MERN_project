import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { create, reset } from "../../../features/posts/postsSlice"
import { notification } from "antd"

const Post = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })

    const { title, body } = formData;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { posts, isError, isSuccess, message } = useSelector((state) => state.posts);

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

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("title", e.target.title.value);
        formData.set("body", e.target.body.value);
        dispatch(create(formData));
    };

    const post = posts.map((post) => {
        return (
            <div className="post" key={post._id}>
                <Link to={"/posts/id/" + post._id}>
                    <p>{post.title}</p>
                </Link>
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
};

export default Post