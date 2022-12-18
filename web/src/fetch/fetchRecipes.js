export const AllRecipes = async (token, setRecipes) => {
  try {
    let res = await fetch(
      `/api/v1/recipes`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ``
        }
      }
    );
    let out = await res.json();
    setRecipes(out);
  } catch (err) {
    console.log(err);
  }
};

export const createRecipe = async (token, initData, data, setData) => {
  try {
    await fetch(
      `/api/v1/recipes/create-recipe`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ``,
          'Body': data ? JSON.stringify(data) : ``
        }
      }
    );
    setData(initData);
  } catch (err) {
    console.log(err);
  }
};

export const updateRecipe = async (data, token) => {
  try {
    await fetch(
      `/api/v1/recipes/create-recipe`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ``,
          'Body': data ? JSON.stringify(data) : ``
        }
      }
    );
    setData(initData);
  } catch (err) {
    console.log(err);
  }
};