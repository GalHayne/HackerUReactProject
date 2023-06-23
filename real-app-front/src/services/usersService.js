import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

setTokenHeader();

export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credentials) {
  try{
    const response = await httpService.post("/auth", credentials);
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setTokenHeader();
    return response;
  }catch(err){
    return err;
  }

}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getAllUsers() {
  return httpService.get("/users");
}

export function getFavoriteCards(user) {
  return httpService.get(`users/FavoriteCard/${user?._id}`);
}

export function deleteUser(user_id) {
  return httpService.put(`users/deleteUser/${user_id}`);
}
export function addCardFromUserToFavorite(card_id, user_id) {
  return httpService.put(`users/addFavoriteCard/${card_id}/${user_id}`);
}

export function removeCardFromFavoriteToUser(card_id, user_id) {
  return httpService.put(`users/removeFavoriteCard/${card_id}/${user_id}`);
}

export function toggleUserPermissions(user_id) {
  return httpService.put(`users/${user_id}`);
}

export function removeBlock(user_id) {
  return httpService.put(`users/removeBlock/${user_id}`);
}

export function getMe(user_id) {
  return httpService.get(`/users/${user_id}`);
}

const usersService = {
  createUser,
  loginUser,
  logout,
  getJWT,
  getUser,
  getAllUsers,
  deleteUser,
  getFavoriteCards,
  addCardFromUserToFavorite,
  removeCardFromFavoriteToUser,
  toggleUserPermissions,
  removeBlock,
  getMe,
};

export default usersService;
