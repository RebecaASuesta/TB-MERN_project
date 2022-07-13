import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll, reset } from '../../features/posts/postsSlice'
import Post from './Post/Post'
import "../Posts/Posts.scss"

const Posts = () => {

    const { isLoading } = useSelector((state) => state.posts)

    const dispatch = useDispatch();

    const getPostsAndReset = async () => {
        await dispatch(getAll());
        dispatch(reset())
    };

    useEffect(() => {
        getPostsAndReset()
    }, []);

    if (isLoading) {
        return <h1>Cargando posts...</h1>
    };

    return (
        <div className='post'>
            <Post />
        </div>
    )
}

export default Posts