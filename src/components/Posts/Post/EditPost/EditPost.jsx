import { useDispatch, useSelector } from "react-redux/es/exports"
import { Button, Modal, Form, Select, Input } from "antd";
import { useEffect } from "react";
import { update } from "../../../../features/posts/postsSlice";

const EditModal = ({ visible, setVisible }) => {
    // const { Option } = Select;

    const dispatch = useDispatch();

    const { posts, post } = useSelector((state) => state.posts);

    const [form] = Form.useForm();

        useEffect(() => {
            const postToEdit = {
                ...post,
                PostId: posts.map((e) => e._id)
            }
            form.setFieldsValue(postToEdit)
        }, [post])

    // const selectOption = posts.map((post) => {
    //     return (
    //         <Option key={post._id} value={post._id}>
    //             {post.title}, {post.body}
    //         </Option>
    //     )
    // });

    const onFinish = (values) => {
        const postWithId = { ...values, _id: post._id};
        dispatch(update(postWithId));
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    return (
        <Modal
            title="Modifica tu acta"
            visible={visible}
            onCancel={handleCancel}
            footer={[]}
        >
            <Form onFinish={onFinish} form={form}>
                <Form.Item label="Título" name="title">
                    <Input placeholder="Título" />
                </Form.Item>
                <Form.Item label="Descripción" name="body">
                    <Input placeholder="Descripción" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Modificar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditModal