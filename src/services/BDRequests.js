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

export async function HeadcountFetch(startDate, endDate, leaderEmail) {
    const response = await instance
        .post("/headcount", {startDate, endDate, leaderEmail})
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

export async function TurnoverFetch(startDate, endDate, leaderEmail) {
    const response = await instance
        .post("/turnover", {startDate, endDate, leaderEmail})
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

export async function headcountForIndirects(startDate, endDate, leaderEmail) {
    const response = await instance
        .post("/headcountForIndirects", {startDate, endDate, leaderEmail})
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

export async function turnoverForIndirects(startDate, endDate, leaderEmail) {
    const response = await instance
        .post("/turnoverForIndirects", {startDate, endDate, leaderEmail})
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

