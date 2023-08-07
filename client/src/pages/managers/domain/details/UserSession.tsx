import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getUserSessionsByClientId} from "../../../../api/clients";
import dayjs from "dayjs";
import {Button, message, Table} from "antd";
import {logoutUserByUserId, logoutUserSessionSessionId} from "../../../../api/user";
import {AlignType} from "rc-table/lib/interface";
import {LogoutOutlined} from "@ant-design/icons";
import {useRootContext} from "../../../root/context/useRootContext";


const UserSession: React.FC = () => {
    const {realmId, domainId} = useParams()
    const [dataSource, setDataSource] = useState()
    const [userIds, setUserIds] = useState<[]>([])
    const {setSpinning} = useRootContext()

    function getData() {
        setSpinning(true)
        getUserSessionsByClientId(realmId, domainId).then((response) => {
            setDataSource(response)
            let userIds = response.map((element: any) => element.userId)
            setUserIds(userIds)
            setSpinning(false)
        })
    }

    useEffect(() => {
        getData();
    }, [realmId, domainId])


    const logoutAllUsers = async () => {
        setSpinning(true)
        for (const userId of userIds) {
            await logoutUserByUserId(realmId, userId, true);
        }
        message.success("Cập nhật thành công");
        getData();
    }


    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "username",
            key: "username",
            render: (text: string, record: any) => {
                return <Link to={`/realm/${realmId}/managers/user/${record?.userId}`}>
                    {text}
                </Link>
            }
        },
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
            title: <>
                <Button onClick={() => logoutAllUsers()}>
                    Thoát đăng nhập tất cả
                </Button>
            </>,
            dataIndex: "id",
            key: "action",
            align: 'center' as AlignType,
            width: "7%",
            render: (text: string) => {
                return <Button
                    icon={<LogoutOutlined/>}
                    onClick={() => {
                        logoutUserSessionSessionId(realmId,
                            text).then(() => {
                            getData()
                        })
                    }
                    }
                />
            }
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </>
    );
};

export default UserSession;
