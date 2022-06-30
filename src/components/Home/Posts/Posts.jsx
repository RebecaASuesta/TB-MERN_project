import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAll, reset } from '../../../features/posts/postsSlice'
import Post from '../../Post/Post'

const Posts = () => {

    const { isLoading } = useSelector((state) => state.posts)

    const dispatch = useDispatch();

    const getPostsAndReset = async () => {
        await dispatch(getAll());
        dispatch(reset())
    };

    useEffect(() => {
        getPostsAndReset();
    }, []);

    if (isLoading) {
        return <h1>CArgando posts...</h1>
    };

    return (
        <div>
            <h1>Posts</h1>
            <Post />
        </div>
    )
}

export default Posts