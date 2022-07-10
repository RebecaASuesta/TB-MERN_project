import axios from "axios"

const API_URL = "http://localhost:8080";

const getAll = async () => {
    const res = await axios.get(API_URL + "/posts");
    return res.data
};

const getById = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "/posts/id/" + _id, {
        headers: {
            authorization: user?.token
        }
    });
    return res.data
};

const create = async (formData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "/posts", formData, {
        headers: {
            authorization: user?.token
        }
    });
    return res.data
};

const createComment = async (commentData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "/comments", commentData, {
        headers: {
            authorization: user?.token
        }
    });
    return res.data
};

const getInfo = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "/users/getInfo", {
        headers: {
            authorization: user?.token
        }
    });
    return res.data
};

const like = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(API_URL + "/posts/like/id/" + _id, {
        headers: {
            authorization: user?.token
        }
    });
    console.log(res.data)
    return res.data
};

const dislike = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(API_URL + "/posts/dislike/id/" + _id, {
        headers: {
            authorization: user?.token
        }
    });
    return res.data
};

const getPostByName = async (postTitle) => {
    const res = await axios.get(API_URL + "/posts/title/" + postTitle);
    return res.data;
};

const postsService = {
    getAll,
    getById,
    create,
    createComment,
    getInfo,
    like,
    dislike,
    getPostByName
}

export default postsService