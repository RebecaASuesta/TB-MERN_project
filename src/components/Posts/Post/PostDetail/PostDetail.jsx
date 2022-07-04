import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { reset, getById, createComment } from "../../../../features/posts/postsSlice"
import { notification } from "antd"

const PostDetail = () => {
    const { _id } = useParams();

    const [commentData, setCommentData] = useState({
        body: ''
    });

    const { body } = commentData;

    const dispatch = useDispatch();

    const { post, isError, isSuccess, message } = useSelector((state) => state.posts);

    const commentBody = post.commentIds?.map(comment => {
        return (
            <div key={comment._id}>
                {comment.body}
            </div>
        )
    });

    useEffect(() => {
        dispatch(getById(_id))
    }, []);

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
            })
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch]);

    const onChange = (e) => {
        setCommentData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment({ body: commentData.body, postId: post._id }));
        e.target.body.value = ""
    };

    return (
        <>
            <div>
                <h1>PostDetail</h1>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>{commentBody}</p>
            </div>
            <div>
                <h3>AddComment</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" name="body" value={body} onChange={onChange} />
                    <button type="submit">Publicar</button>
                </form>
            </div>
        </>
    )
};

export default PostDetail