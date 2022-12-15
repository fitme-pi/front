import axios from "axios";

axios.defaults.baseURL = "https://fitme.pythonanywhere.com/";
// axios.defaults.baseURL = "http://localhost:8000/";

axios.defaults.headers.common["Content-Type"] = "application/json";
