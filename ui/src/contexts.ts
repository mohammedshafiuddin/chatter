import React from "react";
import { wsContextType } from "./types/type-defs";

export const wsContext = React.createContext<wsContextType | null>(null);


