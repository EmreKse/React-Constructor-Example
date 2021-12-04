
export class AuthService {

    static baseURL = "http://localhost:8080/api/"

    static apiGet = (url) => {
        return fetch(AuthService.baseURL + url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
        }).then(response => {
            if(response.status !== 200)
            {
                throw new Error(response.status)
            }
            return response.json()
        })
    }

    setToken = idToken => {
        localStorage.setItem("access_token", idToken);
    };

    getToken = () => {
        return localStorage.getItem("access_token");
    };

    setUser (user) {
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

