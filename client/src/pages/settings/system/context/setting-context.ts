import {createContext} from "react";

export interface SettingContextInterface {
    realmData: object;

    updateRealm: (data: object) => void;

}

export const SettingContext = createContext<SettingContextInterface | null>
(null)