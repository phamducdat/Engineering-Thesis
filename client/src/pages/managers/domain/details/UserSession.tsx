import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getUserSessionsByClientId} from "../../../../api/clients";
import dayjs from "dayjs";
import {Table} from "antd";


const UserSession: React.FC = () => {
    const {realmId, domainId} = useParams()
    const [dataSource, setDataSource] = useState()

    useEffect(() => {
        getUserSessionsByClientId(realmId, domainId).then((reponse) => {
            setDataSource(reponse)
        })
    }, [realmId, domainId])

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
