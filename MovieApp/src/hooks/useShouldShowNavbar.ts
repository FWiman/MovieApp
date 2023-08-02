import { useContext } from "react";
import { UserContext } from "../Components/UserContext/userContext";
import { useLocation } from "react-router-dom";

export function useShouldShowNavbar() {
  const { isUserLoggedIn } = useContext(UserContext) || {};
  const location = useLocation();

  console.log("Is user logged in (useShouldShowNavbar): ", isUserLoggedIn);

  return isUserLoggedIn && location.pathname !== "/";
}
