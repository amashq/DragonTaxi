import axios from "axios";

import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

// const BASE_URL = 'http://localhost:8080';
const headers = new Headers({
    'Content-Type': 'application/json',
});

function getAccessToken () {
    if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
}

class AuthService {

    login(loginRequest) {
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        return axios.post(BASE_URL + "/login", loginRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    signup(signupRequest) {
        // if(localStorage.getItem(ACCESS_TOKEN)) {
        //     headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        // }
        getAccessToken();
        return axios.post(BASE_URL + "/signup", signupRequest, {
            headers: headers
        });
    }

    checkUsernameAvailability(username) {
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        return axios.get(BASE_URL + `/signup/${username}`, {
            headers: headers
        });
    }

    getCurrentUser() {
        // const headers = new Headers();
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        return axios.get(BASE_URL + "/user/me", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }
}

export default new AuthService()