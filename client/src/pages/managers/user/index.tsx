import React, {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../../../api/user";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Tabs} from "antd";
import {useRootContext} from "../../root/context/useRootContext";
import DP_Tabs from "../../../custom/data-display/tabs";
import DeleteOption from "../../../custom/data-display/table/columns/delete";
import {DP_Table} from "../../../custom/data-display/table";
import {getMe} from "../../../api/admin";
import TabPane = Tabs.TabPane;

export const User: React.FC = () => {
    const {realmId} = useParams()
    const [dataSource, setDataSource] = useState()
    const [userIdResting, setUserIdResting] = useState<string>()
    const {setSpinning, reloadData, setReloadData, setTitle} = useRootContext()
    let navigate = useNavigate()

    function initData() {
        setSpinning(true)
        getUsers(realmId).then(response => {
            setDataSource(response)
            setSpinning(false)
        })
    }

    useEffect(() => {
        initData();
        setTitle("Tài khoản")
    }, [])


    useEffect(() => {
        if (reloadData == "user") {
            initData()
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
                    onClick={() => {
                        navigate("add")
                    }}
                >
                    Tạo mới
                </Button>}
            >
                <TabPane key={"user"} tab={"Tất cả"}>
                    <DP_Table
                        columns={columns}
                        dataSource={dataSource}
                    />
                </TabPane>
            </DP_Tabs>

        </>
    );
};