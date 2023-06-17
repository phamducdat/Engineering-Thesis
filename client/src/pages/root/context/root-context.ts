import {createContext} from "react";

export interface RootContextInterface {
    title: string;
    setTitle: (title: string) => void;

    reloadData: string | null;

    setReloadData: (data: any) => void;

    spinning: boolean

    setSpinning: (spinning: boolean) => void;
}

export const RootContext = createContext<RootContextInterface | null>(null)