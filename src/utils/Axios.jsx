import axios from "axios";

const instance = axios.create({
    baseURL: "https://final-year-project-api-6xmo.onrender.com" // 🎯 Base API URL
});

export default instance;