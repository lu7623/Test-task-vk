import { createContext } from "react";
import { Group } from "../api/types";

export const GroupsContext = createContext<Group[]>([]);