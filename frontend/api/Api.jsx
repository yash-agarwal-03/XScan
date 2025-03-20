import axios from "axios";

//post api
const Login = async(data)=>{
    const payload = { email:data.email, password:data.password };
    const response = await axios.post("http://127.0.0.1:5000/api/data", payload);
    console.log(response.data);
}

function SendImage(data){

}
export {Login,SendImage};