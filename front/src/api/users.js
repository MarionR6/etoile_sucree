// const API_USER = "/api/user";
// const backAddress = "http://localhost:8000";

// export async function connectUser(loginUserInfo) {
//     const response = await fetch(`${backAddress}${API_USER}/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginUserInfo)
//     });
//     const backResponse = await response.json();
//     if (response.ok) {
//         console.log("Utilisateur ajouté en BDD");
//     } else {
//         if (backResponse) {
//             throw backResponse;
//         } else {
//             throw new Error("Error API loginUserInfo");
//         }
//     }
// }