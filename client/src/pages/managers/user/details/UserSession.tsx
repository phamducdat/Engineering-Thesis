import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {getSessionsByUserId, logoutUserByUserId, logoutUserSessionSessionId} from "../../../../api/user";
import {Button, Table} from "antd";
import dayjs from "dayjs";
import {LogoutOutlined} from "@ant-design/icons";
import {AlignType} from "rc-table/lib/interface";


const UserSession: React.FC = () => {

    const {realmId, userId} = useParams()
    const [dataSource, setDataSource] = useState<any[]>()
    const [originalDataSource, setOriginalDataSource] = useState<any[]>()
    const [searchParams] = useSearchParams()


    function getData() {
        getSessionsByUserId(realmId, userId).then((response) => {
            setOriginalDataSource(response)
            setDataSource(response)
        })
    }

    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        if (searchParams.get('search')
            && originalDataSource !== undefined) {
            const data = originalDataSource.filter((element: any) => element.ipAddress.indexOf(searchParams.get('search')) !== -1)
            setDataSource(data)
        } else
            setDataSource(originalDataSource)
    }, [searchParams, originalDataSource])


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
                        getData()
                    })
                }}>
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
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default UserSession;
