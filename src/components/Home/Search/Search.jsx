import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getPostByName } from "../../../features/posts/postsSlice"
import Post from "../../Posts/Post/Post"

const Search = () => {
    const { postName } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostByName(postName))
    }, [postName])

    return (
        <div><Post/></div>
    )
}

export default Search