import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { reset, getById, createComment } from "../../../../features/posts/postsSlice"
import { notification, Form, Input, Button } from "antd"
import "../PostDetail/PostDetail.scss"

const { TextArea } = Input

const PostDetail = () => {
    const { _id } = useParams();

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

    const onFinish = (values) => {
        dispatch(createComment(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };

    return (
        <>
            <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>{commentBody}</p>
            </div>
            <div className="createComment">
                <h2>Ruegos y preguntas</h2>
                <Form className="form"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item className="input"
                        label="Intervención"
                        name="body"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item className="ItemButton" wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Publicar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
};

export default PostDetail