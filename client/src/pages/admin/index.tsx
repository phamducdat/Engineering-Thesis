import React, {useEffect, useState} from "react";
import {getAllRealms} from "../../api/realms";
import {Button, Table, Tabs} from "antd";
import {Link} from "react-router-dom";
import {CreateRealmModal} from "./CreateRealm";
import TabPane = Tabs.TabPane;

export const Admin: React.FC = () => {

    const [dataSource, setDataSource] = useState()
    const [openCreateModal, setOpenCreateModal] = useState(false)

    useEffect(() => {
        setOpenCreateModal(false)
        getAllRealms().then((response) => {
            setDataSource(response?.map((item: {
                id: any;
                realm: any;
            }) => {
                return {
                    label: item.realm,
                    key: item.id
                }
            }))
        })
    }, [])

    const columns = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text: any) => {
                return <Link to={`/realm/${text}`}>
                    {text}
                </Link>
            }
        }

    ]


    return (
        <>
            <Tabs tabBarExtraContent={
                <>
                    <Button
                        onClick={() => {
                            setOpenCreateModal(true)
                        }}
                    >
                        Tạo mới
                    </Button>
                </>

            }>
                <TabPane key="all" tab={"Tất cả"}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                    />
                </TabPane>
            </Tabs>

            <CreateRealmModal
                open={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
            />
        </>
    );
};