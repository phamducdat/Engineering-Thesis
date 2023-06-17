import React, {useEffect, useState} from 'react';
import {useRootContext} from "../../root/context/useRootContext";
import {Collapse} from "antd";
import LoginSetting from "./LoginSetting";
import {useParams} from "react-router-dom";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../api/realms";
import {SettingContext} from "./context/setting-context";

const {Panel} = Collapse;
const System: React.FC = () => {
    const {setTitle} = useRootContext()
    const {realmId} = useParams()
    const [realmData, setRealmData] = useState<object>({})

    useEffect(() => {
        setTitle("Cài đặt hệ thống")
        getRealmInfoByRealmId(realmId).then((response) => {
            setRealmData(response)
        })
    }, [])

    const updateRealm = (data: object) => {
        updateRealmByRealmId(realmId, data).then((response) => {
        })
    }


    return (
        <div>
            <SettingContext.Provider
                value={{
                    realmData,
                    updateRealm
                }}
            >
                <Collapse>
                    <Panel header={"Đăng nhập"} key={"login"}>
                        <LoginSetting/>
                    </Panel>
                </Collapse>
            </SettingContext.Provider>
        </div>
    );
};

export default System;
