import { useMemo } from "react";
import getData from "../data/technologies";

function useTechnologyData(name) {
  return useMemo(() => getData(name), [name]);
}

export default useTechnologyData