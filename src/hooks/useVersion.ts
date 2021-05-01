import { useContext } from "react";
import { VersionContext } from "contexts/Version"

const useVersion = () => {
  return { ...useContext(VersionContext) };
};

export default useVersion;
