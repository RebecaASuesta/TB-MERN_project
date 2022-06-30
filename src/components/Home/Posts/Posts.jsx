import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Post from '../../Post/Post'

const Posts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getall());
    }, []);
    
    return (
        <div>
            <h1>Posts</h1>
            <Post/>
        </div>
    )
}

export default Posts