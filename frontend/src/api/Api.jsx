import axios from "axios";

//post api
const Login = async (data) => {
    try {
        console.log("again")
        const response = await axios.post("/login", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
const Register = async (data) => {
    try {
        const response = await axios.post("/register", data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

function SendImage(data) {
    try {
        const response = axios.post("/imageApi/sendimage", data);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

const GetImage = async (data) => {
    try {
        const response = await axios.post("/imageApi/getimage", data);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
const GetImageList = async (data) => {
    try {
        const response = await axios.post("/imageApi/getimagelist", data);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
export {
    Login,
    SendImage,
    Register,
    GetImage,
    GetImageList
};