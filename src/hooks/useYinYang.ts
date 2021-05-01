import { useContext } from "react";
import { Context } from "../contexts/YinYangProvider";

const useYinYang = () => {
  const { yinyang } = useContext(Context);
  return yinyang;
};

export default useYinYang;
