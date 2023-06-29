import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Tabs} from "antd";
import {getUserById, updateUser} from "../../../../api/user";
import {mode, UserContent} from "../UserContent";
import {PermissionTransfer} from "./PermissionTransfer";
import DP_Tabs from "../../../../custom/data-display/tabs";
import UserCredentials from "./UserCredentials";
import {useRootContext} from "../../../root/context/useRootContext";
import UserSession from "./UserSession";
import {getMe} from "../../../../api/admin";
import TabPane = Tabs.TabPane;

export const Index: React.FC<{}> = props => {

    const {realmId, userId} = useParams();
    const {setTitle} = useRootContext()
    const [userData, setUserData] = useState()


    useEffect(() => {
        getUserById(realmId, userId).then((response) => {
            setUserData(response)
            setTitle(`Thông tin nhân sự: ${response?.username}`)
        })
    }, [userId])

    const onFinish = (value: object) => {
        updateUser(realmId, userId, value).then((response) => {

        })
    }

    return (
        <>
            <DP_Tabs>
                <TabPane key={"userDetails"} tab={"Thông tin nhân sự"}>
                    <UserContent
                        onFinish={onFinish}
                        userData={userData}
                        mode={mode.Update}
                    />
                </TabPane>

                <TabPane key={"credentials"} tab={"Bảo mật"}>
                    <UserCredentials/>
                </TabPane>

                {getMe().sub !== userId &&
                    <TabPane key={"permissions"} tab={"Phân quyền"}>
                        <PermissionTransfer/>
                    </TabPane>}

                <TabPane key={"session"} tab={"Phiên hoạt động"}>
                    <UserSession/>
                </TabPane>
            </DP_Tabs>
        </>
    );
};