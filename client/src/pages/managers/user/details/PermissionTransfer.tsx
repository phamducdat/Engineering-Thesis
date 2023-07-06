import React, {useEffect, useState} from "react";
import {TransferDirection} from "antd/es/transfer";
import {Transfer} from "antd";
import {getAllClients} from "../../../../api/clients";
import {useParams} from "react-router-dom";
import {createUserClients, deleteUserClients, getUserClientByUserId} from "../../../../api/external";
import {filterClient} from "../../../../custom/filter-client";

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
    const {realmId, userId} = useParams()


    useEffect(() => {

        setFlag(false)
        getUserClientByUserId(realmId, userId).then((res) => {
            setTargetKeys(res.clientIds)
        }).finally(() => {
            setFlag(true)
        })

        getAllClients(realmId).then((response) => {
            const baseData = filterClient(response)?.map((item: any) => {
                return {
                    key: item.id,
                    title: item.clientId,
                    description: item.baseUrl
                }
            })
            setDataSource(baseData)


        })
    }, [])


    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {

        if (direction === 'right') {
            const data = {
                clientIds: moveKeys
            }
            createUserClients(realmId, userId, data).then(r => {
            })
        } else if (direction === 'left') {
            const data = {
                clientIds: moveKeys
            }
            deleteUserClients(realmId, userId, data).then(r => {
            })
        }

        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };


    return (
        <>
            {flag && dataSource !== undefined && <Transfer
                dataSource={dataSource}
                listStyle={{
                    width: 300,
                    height: 300,
                }}
                titles={['Danh sách domain', 'Phân quyền']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                render={(item) => item.title}
                showSearch
            />}
        </>
    );
};