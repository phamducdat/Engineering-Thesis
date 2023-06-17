import {SettingContext, SettingContextInterface} from "./setting-context";
import {useContext} from "react";

export const useSettingContext = (): SettingContextInterface => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error('useSettingContext must be used within a RootContext provider');
    }
    return context;
}