import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/";

const instance = axios.create({
    baseURL,
});



export async function LoginFetch(email) {
    const response = await instance
        .get(`/employee/${email}`)
        .catch((error) => {
            console.log(error);
            return error.response;
        });

    if (response.data) {
        const { data } = response;
        console.log(data);
        return response;
    }
    return response;
}

