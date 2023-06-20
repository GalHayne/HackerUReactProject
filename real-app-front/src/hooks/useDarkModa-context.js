import { useContext } from "react";
import DarkContext from "../context/dark.context";

function useDarkContext() {
    return useContext(DarkContext);
};

export default useDarkContext;