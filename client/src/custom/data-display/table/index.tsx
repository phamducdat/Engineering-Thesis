import React from "react";
import {Table, TableProps} from "antd";

export const DP_Table: React.FC<TableProps<any>> = props => {
    return (
        <>
            <Table
                {...props}
                sticky
            />
        </>
    );
};
