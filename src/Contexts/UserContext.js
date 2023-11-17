import { createContext } from "react";
import User from "../Models/Users/User";
const user = new User()
export const UserContext = createContext(user);