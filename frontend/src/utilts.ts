import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
const LOCAL_STORAGE_KEY = "addContactForm";
const instance = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, LOCAL_STORAGE_KEY, instance };
