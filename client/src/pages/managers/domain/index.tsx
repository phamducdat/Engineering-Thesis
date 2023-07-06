import React, {useEffect, useState} from "react";
import {deleteClient, getAllClients} from "../../../api/clients";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Tabs} from "antd";
import {DP_Table} from "../../../custom/data-display/table";
import {useRootContext} from "../../root/context/useRootContext";
import DP_Tabs from "../../../custom/data-display/tabs";
import {filterClient} from "../../../custom/filter-client";
import DeleteOption from "../../../custom/data-display/table/columns/delete";
import TabPane = Tabs.TabPane;
import Table from "@datpd/packages"

export const Domain: React.FC = () => {

    const {realmId} = useParams()
    const [dataSource, setDataSource] = useState()
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const {setTitle, reloadData, setReloadData} = useRootContext()
    let navigate = useNavigate()


    function initData() {
        getAllClients(realmId).then((response) => {
            setDataSource(filterClient(response))

        })
    }

    useEffect(() => {
        setReloadData(null)
        setOpenCreateModal(false)
        initData();
        setTitle("Domain")
    }, [])


    useEffect(() => {
        if (reloadData === "clients") {
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
            title: "Domain Id",
            dataIndex: "clientId",
            key: "clientId"
        },
        {
            title: "Domain",
            dataIndex: "webOrigins",
            key: "webOrigins"
        },
        {
            title: "",
            dataIndex: "id",
            key: "delete",
            width: "7%",
            render: (text: string, record: any) => {
                return <>
                    <DeleteOption
                        content={record?.clientId}
                        type={
                            "Domain"
                        } onOk={
                        () => {
                            deleteClient(realmId, text).then(r => {
                                setReloadData("clients")
                            })
                        }

                    }/>
                </>
            }
        }
    ]


    return (
        <>
            <DP_Tabs
                tabBarExtraContent={
                    <>
                        <Button
                            onClick={() => {
                                navigate("add")
                            }}
                        >
                            Tạo mới
                        </Button>
                    </>
                }
            >
                <TabPane key={"all"} tab={"Tất cả"}>
                    <DP_Table
                        columns={columns}
                        dataSource={dataSource}
                    />
                </TabPane>
            </DP_Tabs>

        </>
    );
};