import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getAllClientSessions} from "../../../api/clients";
import {useRootContext} from '../../root/context/useRootContext';
import DP_Tabs from "../../../custom/data-display/tabs";
import {Button, Tabs} from "antd";
import {DP_Table} from "../../../custom/data-display/table";
import {getRealmBriefRepresentation, removeAllUserSessions} from "../../../api/realms";
import {filterClient} from "../../../custom/filter-client";
import TabPane = Tabs.TabPane;


const Sessions: React.FC = () => {

    const {realmId} = useParams()
    const [dataSource, setDataSource] = useState()
    const [realmBriefRepresentation, setRealmBriefRepresentation] = useState()
    const {setTitle} = useRootContext()

    useEffect(() => {
        setTitle("Phiên hoạt động")
        getRealmBriefRepresentation().then((response) => {
            setRealmBriefRepresentation(response)
        })
        getAllClientSessions(realmId).then((response) => {
            setDataSource(filterClient(response))
        })
    }, [realmId])

    const columns = [
        {
            title: "Domain",
            dataIndex: "clientId",
            key: "clientId",
            render: (text: string, record: any) => {
                return <Link to={`/realm/${realmId}/managers/domain/${record.id}?tab-key=session`}>
                    {text}
                </Link>
            }
        },
        {
            title: "Phiên hoạt động",
            dataIndex: "active",
            key: "active"
        },
        {
            title: "Phiên ngoại tuyến",
            dataIndex: "offline",
            key: "offline"
        },
    ]
    return (
        <>
            <DP_Tabs
                tabBarExtraContent={<Button onClick={() => {
                    removeAllUserSessions(realmId).then(() => {
                    })
                }}>
                    Đăng xuất tất cả
                </Button>}
            >
                <TabPane key="sessions" tab={"Tất cả"}>
                    <DP_Table
                        columns={columns}
                        dataSource={dataSource}
                    />

                </TabPane>
            </DP_Tabs>

        </>
    );
};

export default Sessions;
