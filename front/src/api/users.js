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
        console.log(backResponse);
        return (backResponse);
    } else {
        if (backResponse) {
            console.log(backResponse);
            throw backResponse;
        } else {
            throw new Error("Error API logUser");
        }
    }
}

export async function register(values) {
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