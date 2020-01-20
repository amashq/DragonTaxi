import axios from "axios";

import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

class RouteDataService {

    getRoutes() {
        return axios.get(BASE_URL + '/listAllRoutes', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    addRoute(route) {
        return axios.post(BASE_URL + "/addRoute", route, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    deleteRoute(route) {
        return axios.post(BASE_URL + "/deleteRoute", route, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getRoute(id) {
        return axios.get(BASE_URL + `/route/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    }

    updateRoute(route){
        return axios.post(BASE_URL + "/updateRoute", route, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    getStartAddresses(){
        return axios.get(BASE_URL + "/getStartAddress", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    getDestAddresses(start) {
        return axios.get(BASE_URL + `/getDestAddress/${start}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }
}

export default new RouteDataService()