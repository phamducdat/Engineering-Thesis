import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getSessionsByUserId, logoutUserByUserId, logoutUserSessionSessionId} from "../../../../api/user";
import {Button, Table} from "antd";
import dayjs from "dayjs";
import {LogoutOutlined} from "@ant-design/icons";


const UserSession: React.FC = () => {

    const {realmId, userId} = useParams()
    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        getSessionsByUserId(realmId, userId).then((response) => {
            setDataSource(response)
        })
    }, [])


    const columns = [
        {
            title: "Địa chỉ IP",
            dataIndex: "ipAddress",
            key: "ipAddress",
        },
        {
            title: "Bắt đầu từ",
            dataIndex: "start",
            key: "start",
            render: (text: string) => {
                return dayjs(text).format('DD/MM/YYYY HH:mm:ss');
            }
        },
        {
            title: "Lần cuối truy cập",
            dataIndex: "lastAccess",
            key: "lastAccess",
            render: (text: string) => {
                return dayjs(text).format('DD/MM/YYYY HH:mm:ss');
            }
        },
        {
            title: <>
                <Button onClick={() => {
                    logoutUserByUserId(realmId, userId).then(() => {

                    })
                }}>
                    Thoát đăng nhập tất cả
                </Button>
            </>,
            dataIndex: "id",
            key: "action",
            width: "7%",
            render: (text: string) => {
                return <Button
                    icon={<LogoutOutlined/>}
                    onClick={() => {
                        logoutUserSessionSessionId(realmId,
                            text).then(() => {
                        })
                    }
                    }
                />
            }
        },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default UserSession;
