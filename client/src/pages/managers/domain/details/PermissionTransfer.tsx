import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createClientUsers, deleteClientUsers, getClientUsersByClientId} from "../../../../api/external";
import {TransferDirection} from "antd/es/transfer";
import {Col, Form, Row, Select, Tag, Transfer} from "antd";
import {getUsers} from "../../../../api/user";
import {getMe} from "../../../../api/admin";
import {useRootContext} from "../../../root/context/useRootContext";

interface RecordType {
    key: string;
    title: string;
    description: string;
}


export const PermissionTransfer: React.FC<{}> = props => {
    const [targetKeys, setTargetKeys] = useState<string[]>();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [dataSource, setDataSource] = useState<RecordType[]>()
    const [flag, setFlag] = useState(false)
    const [statusUser, setStatusUser] = useState('active')
    const {realmId, domainId} = useParams()
    const {setSpinning} = useRootContext()


    async function getData() {
        setFlag(false)
        setSpinning(true)


        await getUsers(realmId).then((response) => {
            const convertData = response
                .filter((data: any) => {
                    if (statusUser === 'active')
                        return data.id !== getMe().sub && data.enabled === true
                    else
                        return data.id !== getMe().sub
                })
                .map((item: any) => {
                    if (!item.enabled)
                        return {
                            key: item.id,
                            title:
                                <>
                                    {item.username} - <Tag>
                                    Không hoạt động
                                </Tag>
                                </>
                        }
                    else
                        return {
                            key: item.id,
                            title: item.username,
                        }
                })
            setDataSource(convertData)
        })

        await getClientUsersByClientId(realmId, domainId).then((res) => {
            setTargetKeys(res.userIds)
        }).finally(() => {
            setFlag(true)
        })


        setSpinning(false)
    }

    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        getData()
    }, [statusUser])


    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {

        if (direction === 'right') {
            const data = {
                userIds: moveKeys
            }
            createClientUsers(realmId, domainId, data).then(r => {
                getData()
            })
        } else if (direction === 'left') {
            const data = {
                userIds: moveKeys
            }
            deleteClientUsers(realmId, domainId, data).then(r => {
                getData()
            })
        }

        // setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };


    return (
        <>
            {flag && dataSource !== undefined &&

                <>
                    <Row>
                        <Col span={5}>
                            <Form.Item
                                label={"Trạng thái tài khoản"}
                            >
                                <Select
                                    style={{width: "100%"}}
                                    value={statusUser}
                                    onChange={(value) => {
                                        setStatusUser(value)
                                    }}
                                    options={[
                                        {
                                            label: 'Hoạt động',
                                            key: 'active',
                                            value: 'active',
                                        },
                                        {
                                            label: 'Toàn bộ',
                                            key: 'all',
                                            value: 'all',
                                        }
                                    ]
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Transfer
                        dataSource={dataSource}
                        listStyle={{
                            width: 300,
                            height: 300,
                        }}
                        titles={['Danh sách tài khoản', 'Phân quyền']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        render={(item) => item.title}
                        showSearch
                    />
                </>
            }
        </>
    );
};