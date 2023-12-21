const API_USERS = "/api/users";

// FUNCTION TO GET THE ALREADY CONNECTED USER THANKS TO THE COOKIE "TOKEN" STORED IN THE USER'S NAVIGATOR

export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    return response.json();
}

// FUNCTION TO LOGIN

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

// FUNCTION TO REGISTER

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
            throw backResponse;
        } else {
            throw new Error("Error API createUser");
        }
    }
}

// FUNCTION TO MODIFY THE USER'S PRIVATE INFORMATION

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

// FUNCTION TO LOGOUT

export async function logout() {
    const response = await fetch(`${API_USERS}/logout`, {
        method: "DELETE"
    }
    );
}

// FUNCTION TO GET ALL THE USERS, USED TO PREPARE THE ADMIN TO DELETE A USER'S ACCOUNT

export async function getAllUsers() {
    const response = await fetch(`${API_USERS}/getAllUsers`
    );
    return response.json();
}

// FUNCTION FOR THE ADMIN TO DELETE A USER

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