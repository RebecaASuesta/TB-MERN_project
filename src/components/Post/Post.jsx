const Post = () => {
    const { posts } = useSelector((state) => state.posts);

    const post = posts.map((post) => {
        return (
            <div className="post">
                <p>{post.title}</p>
            </div>
        )
    })

    return <div>Post</div>
};

export default Post