import {useContext} from "react";
import {RootContext, RootContextInterface} from "./root-context";

export const useRootContext = (): RootContextInterface => {
    const context = useContext(RootContext);
    if (!context) {
        throw new Error('useRootContext must be used within a RootContext provider');
    }
    return context;
}