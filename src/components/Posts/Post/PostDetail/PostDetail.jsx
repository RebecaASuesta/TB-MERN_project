import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getById } from "../../../../features/posts/postsSlice"

const PostDetail = () => {
    const { _id } = useParams();

    const dispatch = useDispatch();

    const { post } = useSelector((state) => state.posts);

    console.log("post", post)

    const commentBody = post.commentIds?.map(comment => {
        return (
            <span key = {comment._id}>
                {comment.body}
            </span>
        )
    });

    // console.log("commentBody", commentBody)

    useEffect(() => {
        dispatch(getById(_id))
    }, []);

    return (
        <div>
            <h1>PostDetail</h1>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>{commentBody}</p>
        </div>
    )
};

export default PostDetail