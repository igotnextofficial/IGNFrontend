import { createContext } from "react";
import User from "../Models/users/User";
const user = new User()
export const UserContext = createContext(user);