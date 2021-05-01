import React, { useCallback, useState } from "react";

import Context from "./Context";

const Provider: React.FC = ({ children }) => {
  const [usingV2, setUsingV2] = useState<boolean>(true);

  const switchVersion = useCallback(() => {
    setUsingV2(!usingV2);
  }, [usingV2, setUsingV2]);

  return (
    <Context.Provider
      value={{
        usingV2,
        switchVersion,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
