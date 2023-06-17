import React from 'react';
import {Tabs, TabsProps} from "antd";
import {useSearchParams} from "react-router-dom";


const DP_Tabs: React.FC<TabsProps> = ({onChange, ...restProps}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnChange = (value: string) => {
        const currentSearchParams = new URLSearchParams(searchParams.toString());
        currentSearchParams.set('tab-key', value);
        setSearchParams(currentSearchParams);

        if (onChange)
            onChange(value)
    }


    return (
        <>
            <Tabs
                type={"card"}
                activeKey={searchParams.get("tab-key") ?? undefined}
                destroyInactiveTabPane={true}
                {...restProps}
                key={searchParams.get("tab-key") !== null ? "dp" : "test"}
                onChange={handleOnChange}
            />

        </>
    );
};

export default DP_Tabs;