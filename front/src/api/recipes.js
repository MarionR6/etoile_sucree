const API_RECIPES = "/api/recipes";

// FRONT FUNCTION TO CALL BACK REQUEST TO LIKE OR DISLIKE A RECIPE

export async function toggleLikeRecipe(idRecipe, idUser) {
    const response = await fetch(`http://localhost:8000${API_RECIPES}/likeRecipe/${idUser}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idRecipe })
    });
    if (response.ok) {
    } else {
        throw new Error("Error api recipes liked");
    }
}

// FUNCTION FOR THE ADMIN TO DELETE A RECIPE

export async function deleteRecipe(idRecipe) {
    const response = await fetch(`http://localhost:8000${API_RECIPES}/deleteRecipe`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idRecipe })
    });
    if (response.ok) {
        return;
    } else {
        throw new Error("Error api recipes delete");
    }
}