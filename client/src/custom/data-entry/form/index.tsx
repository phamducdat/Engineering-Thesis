import {Form, FormProps} from "antd";
import React from "react";

export const DP_Form: React.FC<FormProps> = props => {
    return (
        <Form
            layout={"vertical"}
            {...props}
        >

        </Form>
    );
};