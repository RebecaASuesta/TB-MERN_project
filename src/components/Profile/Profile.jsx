import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getInfo, reset } from "../../features/posts/postsSlice"

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    const { userPosts } = useSelector((state) => state.posts);

    const postIds = userPosts.postIds;

    const dispatch = useDispatch();

    const getUserPosts = async () => {
        await dispatch(getInfo());
        dispatch(reset())
    };

    useEffect(() => {
        getUserPosts()
    }, []);

    const userPost = postIds?.map((userPost) => {
        if (userPost.length <= 0) {
            return (
                <div>
                    <h3>Posts</h3>
                    <p>Todavía no has publicado ningún post</p>
                </div>
            )
        } else {
            return (
                <div key={userPost._id}>
                    <Link to={"/posts/id/" + userPost._id}>
                        <p>{userPost.title}</p>
                    </Link>
                </div>
            )
        }
    });

    return (
        <>
            <div>
                <h1>Profile</h1>
                <p>{user.user.name}</p>
                <p>{user.user.email}</p>
            </div>
            <div>
                <h3>Posts</h3>
                <div>{userPost}</div>
            </div>
        </>
    )
}

export default Profile