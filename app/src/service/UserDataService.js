import axios from "axios";

import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

class UserDataService {

    getUsers() {
        return axios.get(BASE_URL + '/getUsers', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getUser(id) {
        return axios.get(BASE_URL + `/user/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    updateUser(user) {
        return axios.post(BASE_URL + "/editUser", user, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    addUser(user) {
        return axios.post(BASE_URL + "/signup", user, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    deleteUser(user) {
        return axios.post(BASE_URL + "/deleteUser", user, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }
}

export default new UserDataService()