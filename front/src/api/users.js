const API_USERS = "/api/users";

export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    return response.json();
}