const API_RECIPES = "/api/recipes";

export async function toggleLikeRecipe(idRecipe, idUser) {
    const response = await fetch(`http://localhost:8000/api/recipes/likeRecipe/${idUser}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idRecipe })
    });
    if (response.ok) {
        console.log("Liked");
    } else {
        throw new Error("Error api recipes liked");
    }
}

// export async function dislikeRecipe(idRecipe, idUser) {
//     const response = await fetch(`http://localhost:8000/api/recipes/dislike/${idUser}`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ idRecipe }),
//     });
//     if (response.ok) {
//         console.log("Disliked");
//     } else {
//         throw new Error("Error api recipes disliked");
//     }
// }