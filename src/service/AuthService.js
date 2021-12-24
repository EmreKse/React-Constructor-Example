import { Route } from "react-router-dom"

export class AuthService {

    static baseURL = "http://localhost:8080/api/"

    static apiGet = (url) => {
        return fetch(AuthService.baseURL + url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
        }).then(response => {
            AuthService.responseStatus(response);
            return response.json()
        })
    }

    static apiDelete = (url) => {
        return fetch(AuthService.baseURL + url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
        }).then(response => {
            AuthService.responseStatus(response);
            return response;
        })
    }

    static apiPut = (url, body) => {
        return fetch(AuthService.baseURL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            body: JSON.stringify(body)
        }).then(response => {
            AuthService.responseStatus(response);
            return response.json()
        })
    }

    static apiPost = (url, body) => {
        return fetch(AuthService.baseURL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            body: JSON.stringify(body)
        }).then(response => {
            AuthService.responseStatus(response);
            return response.json()
        })
    }



    setToken = idToken => {
        localStorage.setItem("access_token", idToken);
    };

    getToken = () => {
        return localStorage.getItem("access_token");
    };

    static responseStatus(response) {
        if (response.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("authenticated_user");
            window.location = '/'
        }
        if (response.status !== 200) {
            throw new Error(response.status)
        }
    }

    setUser(user) {
        localStorage.setItem("authenticated_user", JSON.stringify(user));
    };

    async loginUser(credentials) {
        return fetch(AuthService.baseURL + 'auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    logoutUser() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("authenticated_user");
    }

}

