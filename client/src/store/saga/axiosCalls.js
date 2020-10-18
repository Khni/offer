import axios from "axios"

export const postData =(url, data) =>{
    return axios.post(url, data);
};

export function postDataHeaderAuth(url, data, token) {
	return axios.post(url, data, {
      headers : { Authorization: `Bearer ${token}`
       }} );
};