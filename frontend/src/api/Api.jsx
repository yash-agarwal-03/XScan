import axios from "axios";

//post api
const Login = async (data) => {
    try {
        const response = await axios.post("/login", data);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
const Register = async (data) => {
    try {
        const response = await axios.post("/register", data);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function SendImage(data) {

}
export { 
    Login,
    SendImage,
    Register, 
};