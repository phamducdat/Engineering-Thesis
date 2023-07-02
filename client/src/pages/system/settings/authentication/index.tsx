import React, {useEffect, useState} from 'react';
import {
    addExecution,
    configAuthentication,
    copyBrowserAuthentication,
    getExecutionsByFlowAlias,
    updateExecutionById
} from "../../../../api/system/authentication";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {DP_Table} from "../../../../custom/data-display/table";
import {Button, Checkbox, Col, message, Row, Select, Space} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";


const Authentication: React.FC = () => {

    const alias = "DCX509"
    const configAlias = "CDCX509"

    const [dataSource, setDataSource] = useState<any []>([]);
    const [noDCX509Installed, setNoDCX509Installed] = useState(false)


    function getData() {
        getExecutionsByFlowAlias(alias).then((response) => {
            setDataSource(response?.filter((element: any) =>
                element.displayName === "X509/Validate Username Form"
                || element.displayName === "DCX509 forms"
            ))
            setNoDCX509Installed(false)
        }).catch((error) => {
            if (error?.response?.status === 404) {
                setNoDCX509Installed(true)
                getExecutionsByFlowAlias("browser").then((response) => {
                    const data = response?.filter((element: any) =>
                        element.displayName === "forms"
                    )
                    setDataSource([
                        ...data,
                        {
                            displayName: "X509/Validate Username Form",
                            requirement: "DISABLE"
                        }
                    ])

                })
            }
        })
    }


    useEffect(() => {
        getData();
    }, [])


    const columns = [
        {
            title: "",
            dataIndex: "index",
            key: "index",
            width: "7%",
            render: (text: string, record: any, index: number) => {
                return <Space>
                    <Button type={"text"} icon={<UpOutlined/>}
                            disabled={index === 0
                                || record.requirement === 'DISABLE'

                            }
                    />
                    <Button type={"text"} icon={<DownOutlined/>}
                            disabled={index === 1
                                || record.requirement === 'DISABLE'
                                || noDCX509Installed
                            }
                    />
                </Space>
            }
        },
        {
            title: "Loại xác thực",
            dataIndex: "displayName",
            key: "displayName",
            render: (text: string, record: any) => {
                if (text === "X509/Validate Username Form") {
                    return "Chứng chỉ số"

                } else
                    return "Tài khoản, mật khẩu"
            }
        },
        {
            title: "",
            dataIndex: "digitalCertificateType",
            key: "digitalCertificateType",
            render: (text: string, record: any) => {
                if (record?.displayName == "X509/Validate Username Form")
                    return <Row>
                        <Col span="12">
                            <Select
                                options={[
                                    {
                                        label: "Email",
                                        value: "email"
                                    },
                                    {
                                        label: "Tên tài khoản",
                                        value: "username"
                                    }
                                ]}
                                style={{width: "100%"}}
                                disabled={noDCX509Installed}
                                defaultValue={"email"}
                            />
                        </Col>
                    </Row>
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "requirement",
            key: "requirement",
            render: (text: string, record: any) => convertRequirement(text, record)
        }
    ]


    const convertRequirement = (text: string, record: any) => {
        if (record.displayName === "X509/Validate Username Form") {
            return <Space>
                <Checkbox
                    checked={text === 'REQUIRED'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'REQUIRED') {
                            if (noDCX509Installed) {
                                createDigitalCertificate('REQUIRED').then(() => {
                                    getData()
                                })
                            }
                        }

                    }}
                >
                    Bắt buộc
                </Checkbox>
                <Checkbox
                    checked={text === 'ALTERNATIVE'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'ALTERNATIVE') {
                            if (noDCX509Installed) {
                                createDigitalCertificate('ALTERNATIVE').then(() => {
                                    getData()
                                })
                            }
                        }
                    }}
                >
                    Có thể thay thế
                </Checkbox>
                <Checkbox
                    checked={text === 'DISABLE'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'DISABLE') {

                        }
                    }}
                >
                    Không hoạt động
                </Checkbox>
            </Space>
        } else {
            // return <CheckboxGroup
            //     options={[{
            //         value: 'REQUIRED',
            //         label: 'Bắt buộc',
            //     },]}
            //     value={[text]}
            // />
        }

    }


    const createDigitalCertificate = async (requirement: string) => {
        try {
            await copyBrowserAuthentication(alias);
            const addExecutionResponse = await addExecution(alias);
            const location = addExecutionResponse.location;
            const executionId = location.substring(location.lastIndexOf('/') + 1);

            const configResponse = await configAuthentication(executionId, configAlias);
            const configLocation = configResponse.location;
            const configId = configLocation.substring(configLocation.lastIndexOf('/') + 1);

            const realmInfo = await getRealmInfoByRealmId("master");

            await Promise.all([
                updateExecutionById(alias, executionId, requirement, true),
                // raisePriorityExecution(executionId),
                updateRealmByRealmId("master", {
                    ...realmInfo,
                    browserFlow: alias
                }, true)
            ]);
            message.success("Cập nhật thành công")
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            {/*<Button onClick={() => createDigitalCertificate('ALTERNATIVE')}>*/}
            {/*    Xác thực bằng chứng chỉ số*/}
            {/*</Button>*/}


            <DP_Table
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
};

export default Authentication;
