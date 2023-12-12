const API_USERS = "/api/users";

export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    return response.json();
}

export async function signin(values) {
    const response = await fetch(`${API_USERS}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    const backResponse = await response.json();
    if (response.ok) {
        return (backResponse);
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("Error API logUser");
        }
    }
}

export async function createUser(values) {
    const response = await fetch(`${API_USERS}/addUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    const backResponse = await response.json();
    if (response.ok) {
        return (backResponse);
    } else {
        if (backResponse) {
            console.log(backResponse);
            throw backResponse;
        } else {
            throw new Error("Error API createUser");
        }
    }
}

export async function modifyUserInfo(values) {
    const response = await fetch(`${API_USERS}/modifyUser`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    if (response.ok) {
        return;
    } else {
        throw new Error("Error API modifyUser");
    }
}

export async function logout() {
    const response = await fetch(`${API_USERS}/logout`, {
        method: "DELETE"
    }
    );
}

export async function getAllUsers() {
    const response = await fetch(`${API_USERS}/getAllUsers`
    );
    return response.json();
}

export async function adminDeleteUser(idUser) {
    const response = await fetch(`${API_USERS}/adminDeleteUser`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idUser })
    });
    return response.json();
}