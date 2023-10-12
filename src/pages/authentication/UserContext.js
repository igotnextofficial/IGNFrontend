import { createContext } from "react";
import User from "../../models/users/User";
const user = new User();
export const UserConext = createContext(user);