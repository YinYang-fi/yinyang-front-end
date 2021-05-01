import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  onVote: () => {},
  proposals: [{token: "0x0000000000000000000000000000000000000000", voices: 0, shares: 0}]
});

export default Context;
