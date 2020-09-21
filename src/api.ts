import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "http://localhost:3002";

export default instance;
