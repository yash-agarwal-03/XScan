import axios from "axios";

//post api
const Login = async (data) => {
  try {
    console.log("again");
    const response = await axios.post("/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
const Register = async (data) => {
  try {
    const response = await axios.post("/register", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const SetImage = async (image) => {
  try {
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));
    formData.append("image", image);
    formData.append("filename", image.name);
    formData.append("content_type", image.type);
    formData.append("userId", user.email);
    const response = await axios.post("http://localhost:5000/api/setImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const GetImage = async (data) => {
  try {
    const response = await axios.post("/api/getImage", data);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
const GetImageList = async (data) => {
  try {
    const response = await axios.post("/api/getUserImageList", data);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
export { Login, SetImage, Register, GetImage, GetImageList };
