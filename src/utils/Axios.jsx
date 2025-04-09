import axios from "axios";

const instance = axios.create({
    baseURL: "https://final-year-project-api-iota.vercel.app" // 🎯 Base API URL
});

export default instance;