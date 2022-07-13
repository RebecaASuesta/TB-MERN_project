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
        return (
            <div key={userPost._id}>
                <Link to={"/posts/id/" + userPost._id}>
                    <p>{userPost.title}</p>
                </Link>
            </div>
        )
    });

    return (
        <>
            <div>
                <h2>Datos personales</h2>
                <p>{user.user.name}</p>
                <p>{user.user.email}</p>
            </div>
            <div>
                <h2>Actas</h2>
                <div>{userPost}</div>
            </div>
        </>
    )
}

export default Profile