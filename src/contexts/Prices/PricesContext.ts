import { createContext } from "react";

import { PriceContext } from "./types"

const PricesContext = createContext<PriceContext>({
  prices: {}
});

export default PricesContext;
