import React from 'react';
import DP_Tabs from "../../../custom/data-display/tabs";
import {Tabs} from "antd";
import Other from "./other";
import Authentication from "./authentication";
import OTPPolicy from "./otp";
import TabPane = Tabs.TabPane;


const Settings: React.FC = () => {
    return (
        <div>
            <DP_Tabs>

                <TabPane tab={"Xác thực"} key={"authentication"}>
                    <Authentication/>
                </TabPane>
                <TabPane tab={"OTP"} key={"otp"}>
                    <OTPPolicy/>
                </TabPane>
                <TabPane tab={"Khác"} key={"other"}>
                    <Other/>
                </TabPane>
            </DP_Tabs>
        </div>
    );
};

export default Settings;
