import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  usingV2: true,
  switchVersion: () => {},
});

export default Context;
