import React, {useEffect, useState} from "react";
import {deleteClient, getAllClients} from "../../../api/clients";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Button, Tabs} from "antd";
import {DP_Table} from "../../../custom/data-display/table";
import {useRootContext} from "../../root/context/useRootContext";
import DP_Tabs from "../../../custom/data-display/tabs";
import {filterClient} from "../../../custom/filter-client";
import DeleteOption from "../../../custom/data-display/table/columns/delete";
import TabPane = Tabs.TabPane;

export const Domain: React.FC = () => {

    const {realmId} = useParams()
    const [dataSource, setDataSource] = useState<any[]>()
    const {setTitle, reloadData, setReloadData, setSpinning} = useRootContext()
    const [searchParams] = useSearchParams()
    let navigate = useNavigate()


    function initData() {
        const search = searchParams.get('search')
        setSpinning(true)
        getAllClients(realmId, {
            clientId: search,
            search: true,
        }).then((response) => {
            setDataSource(filterClient(response))
            setSpinning(false)
        })
    }

    useEffect(() => {
        initData()
    }, [searchParams])

    useEffect(() => {
        setReloadData(null)
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
            key: "webOrigins",
            render: (text: any) => {
                return <a target="_blank" rel="noopener noreferrer" href={text[0]}>
                    {text[0]}
                </a>
            }
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
                            type={"primary"}
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