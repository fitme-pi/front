import axios from "axios";

axios.defaults.baseURL = "https://fitme.pythonanywhere.com/";

axios.defaults.headers.common["Content-Type"] = "application/json";
