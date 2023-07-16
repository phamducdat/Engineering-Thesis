import React, {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../../../api/user";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Button, Tabs, Tag} from "antd";
import {useRootContext} from "../../root/context/useRootContext";
import DP_Tabs from "../../../custom/data-display/tabs";
import DeleteOption from "../../../custom/data-display/table/columns/delete";
import {DP_Table} from "../../../custom/data-display/table";
import {getMe} from "../../../api/admin";
import TabPane = Tabs.TabPane;

export const User: React.FC = () => {
    const {realmId} = useParams()
    const [dataSource, setDataSource] = useState()
    const {setSpinning, reloadData, setReloadData, setTitle} = useRootContext()
    const [searchParams] = useSearchParams()

    let navigate = useNavigate()

    function getData() {
        setSpinning(true)
        const search = searchParams.get('search')
        getUsers(realmId, {
            search: search
        }).then(response => {
            setDataSource(response)
            setSpinning(false)
        })
    }

    useEffect(() => {
        getData();
        setTitle("Tài khoản")
    }, [])

    useEffect(() => {
        getData()
    }, [searchParams])


    useEffect(() => {
        if (reloadData == "user") {
            getData()
            setReloadData(null)
        }

    }, [reloadData])


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (id: string) => {
                return <>
                    <Link to={`${id}`}>
                        {id}
                    </Link>
                </>
            }
        },
        {
            title: "Tên đăng nhập",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Họ",
            dataIndex: "firstName",
            key: "firstName"
        },
        {
            title: "Tên",
            dataIndex: "lastName",
            key: "lastName"
        },
        {
            title: "Trạng thái",
            dataIndex: "enabled",
            key: "enabled",
            render: (text: boolean, record: any) => {
                if (text)
                    return <Tag color={"green"}>
                        Hoạt động
                    </Tag>
                else
                    return <Tag>
                        Không hoạt động
                    </Tag>
            }
        },
        {
            title: "",
            dataIndex: "id",
            key: "resetPassword",
            width: "7%",
            render: (userId: string, record: any) => {

                return <>

                    {
                        getMe().sub !== record.id &&
                        <DeleteOption content={record.username} type={"tài khoản"} onOk={
                            () => {
                                setSpinning(true)
                                deleteUser(realmId, userId).then(() => {
                                    setSpinning(false)
                                    setReloadData("user")
                                })
                            }

                        }/>}
                </>


            }
        }


    ]

    return (
        <>
            <DP_Tabs
                tabBarExtraContent={<Button
                    type={"primary"}
                    onClick={() => {
                        navigate("add")
                    }}
                >
                    Tạo mới
                </Button>}
            >
                <TabPane key={"user"} tab={"Tất cả"}>
                    {dataSource && <DP_Table
                        columns={columns}
                        dataSource={dataSource}
                    />}
                </TabPane>
            </DP_Tabs>

        </>
    );
};