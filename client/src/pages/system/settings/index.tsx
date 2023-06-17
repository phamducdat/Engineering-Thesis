import React from 'react';
import DP_Tabs from "../../../custom/data-display/tabs";
import {Tabs} from "antd";
import TabPane = Tabs.TabPane;
import Token from "./token";



const Settings: React.FC = () => {
  return (
    <div>
      <DP_Tabs>
          <TabPane tab={"Tokens"} tabKey={"tokens"}>
              <Token/>
          </TabPane>
      </DP_Tabs>
    </div>
  );
};

export default Settings;
