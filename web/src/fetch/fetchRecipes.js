export const getAllRecipes = async () => {
  try {
    let response = await fetch(
      `/api/v1/recipes/all`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    //check if the the fetch was successful
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export const createRecipes = async (data, token) => {
  try {
    const response = await fetch(
      `/api/v1/recipes/create`,
      {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ""
        }
      }
    );
    //check if the the fetch was successful
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const output = await response.json();
    return output;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export const updateRecipes = async (data, recipeID, token) => {
  try {
    const response = await fetch(
      `/api/v1/recipes/update-recipe/${recipeID}`,
      {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      }
    );
    //check if the the fetch was successful
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const output = await response.json();
    return output;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export const getRecipesByCategory = async (categoryName) => {
  try {
    let response = await fetch(
      `/api/v1/recipes/category/${categoryName}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    //check if the the fetch was successful
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let output = await response.json();
    return output;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};