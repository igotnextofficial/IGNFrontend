import axios from "axios"
const postDataToEndpoint = async (uri,data,expectedStatus = 200) => {
    const response = await axios.post(uri,data);
    if(response.status !== expectedStatus){
        return false
    }
    return response.data;
}

const login = (data) => {
    let uri = 'https://shield.igotnext.local/api/login'; //will come from env
    return postDataToEndpoint(uri,data)
}

const makeRequest = () => {
    try{
        
    }
    catch(error){
        return error.response.status;
    }
}


export default login