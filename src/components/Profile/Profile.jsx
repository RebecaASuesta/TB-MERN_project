import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getInfo, reset } from "../../features/posts/postsSlice"

const Profile = () => {
    const { user, userPosts } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getUserPosts = async () => {
        await dispatch(getInfo());
        dispatch(reset())
    };

    useEffect(() => {
        getUserPosts()
    }, []);

    const userPost = userPosts?.map((userPost) => {
        return (
            <div key={userPost._id}>
                <Link to={"/posts/id/" + userPost._id}>
                    <p>{userPost.title}</p>
                </Link>
            </div>
        )
    })

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