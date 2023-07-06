import React, {useMemo, useState} from 'react';
import {
    addExecution,
    copyBrowserAuthentication,
    createConfigAuthentication,
    getConfigAuthenticationById,
    getExecutionsByFlowAlias,
    lowerPriorityExecution,
    raisePriorityExecution,
    updateConfigAuthentication,
    updateExecutionById
} from "../../../../api/system/authentication";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {DP_Table} from "../../../../custom/data-display/table";
import {Button, Checkbox, Col, message, Row, Select, Space} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {useRootContext} from "../../../root/context/useRootContext";


const Authentication: React.FC = () => {

    const alias = "DCX509"
    const configAlias = "CDCX509"

    const [dataSource, setDataSource] = useState<any []>([]);
    const [noDCX509Installed, setNoDCX509Installed] = useState(false)
    const [configAuthData, setConfigAuthData] = useState<any>()
    const [flag, setFlag] = useState(false)
    const {setTitle} = useRootContext()


    function getData() {
        setFlag(false)
        getExecutionsByFlowAlias(alias).then((response) => {
            setNoDCX509Installed(false)
            setDataSource(response?.filter((element: any) =>
                element.displayName === "X509/Validate Username Form"
                || element.displayName === "DCX509 forms"
            ))
            response.forEach((element: any) => {
                if (element.displayName === "X509/Validate Username Form") {
                    getConfigAuthenticationById(element.authenticationConfig).then((response) => {
                        setConfigAuthData(response)
                        setFlag(true)
                    })
                }
            })
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
                            requirement: "DISABLED"
                        }
                    ])
                    setFlag(true)

                })
            }
        })
    }


    useMemo(() => {
        setTitle("Xác thực")
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
                                || record.requirement === 'DISABLED'

                            }
                            onClick={() => {
                                raisePriorityExecution(record?.id).then(() => {
                                    getData()
                                })
                            }
                            }
                    />
                    <Button type={"text"}
                            icon={<DownOutlined/>}
                            disabled={index === 1
                                || record.requirement === 'DISABLED'
                                || noDCX509Installed
                            }
                            onClick={() => {
                                lowerPriorityExecution(record?.id).then(() => {
                                    getData()
                                })
                            }}
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
                if (record?.displayName == "X509/Validate Username Form") {
                    let defaultValue = "Subject's e-mail"
                    let onChange;
                    if (configAuthData?.config) {
                        defaultValue = configAuthData?.config['x509-cert-auth.mapping-source-selection'].toString()
                        onChange = (value: string) => {
                            updateConfigAuthentication(record?.authenticationConfig, {
                                ...configAuthData,
                                config: {
                                    ...configAuthData.config,
                                    "x509-cert-auth.mapping-source-selection": value
                                }
                            }).then(() => {
                                // getData()
                            })
                        }
                    }
                    return <Row>
                        <Col span="18">
                            <Select
                                options={[
                                    {
                                        label: "Email (EMAILADDRESS)",
                                        value: "Subject's e-mail"
                                    },
                                    {
                                        label: "Tên tài khoản (CN)",
                                        value: "Subject's Common Name"
                                    }
                                ]}
                                style={{width: "100%"}}
                                disabled={noDCX509Installed || record.requirement === 'DISABLED'}
                                defaultValue={defaultValue}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                }
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
                            } else {
                                updateExecutionById(alias, record.id, 'REQUIRED', false).then(() => {
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
                            } else {
                                updateExecutionById(alias, record.id, 'ALTERNATIVE', false).then(() => {
                                    getData()
                                })
                            }
                        }
                    }}
                >
                    Có thể thay thế
                </Checkbox>
                <Checkbox
                    checked={text === 'DISABLED'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'DISABLED') {
                            updateExecutionById(alias, record.id, 'DISABLED', false).then(() => {
                                getData()
                            })
                        }
                    }}
                >
                    Không hoạt động
                </Checkbox>
            </Space>
        } else {
            return <Space>
                <Checkbox
                    checked={text === 'REQUIRED'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'REQUIRED') {
                            updateExecutionById(alias, record.id, 'REQUIRED', false).then(() => {
                                getData()
                            })
                        }

                    }}
                >
                    Bắt buộc
                </Checkbox>
                <Checkbox
                    checked={text === 'ALTERNATIVE'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'ALTERNATIVE') {
                            updateExecutionById(alias, record.id, 'ALTERNATIVE', false).then(() => {
                                getData()
                            })
                        }
                    }}
                >
                    Có thể thay thế
                </Checkbox>
                <Checkbox
                    checked={text === 'DISABLED'}
                    onChange={(e: CheckboxChangeEvent) => {
                        if (text !== 'DISABLED') {
                            updateExecutionById(alias, record.id, 'DISABLED', false).then(() => {
                                getData()
                            })
                        }
                    }}
                >
                    không hoạt động
                </Checkbox>
            </Space>
        }

    }


    const createDigitalCertificate = async (requirement: string) => {
        try {
            await copyBrowserAuthentication(alias);
            const addExecutionResponse = await addExecution(alias);
            const location = addExecutionResponse.location;
            const executionId = location.substring(location.lastIndexOf('/') + 1);

            const configResponse = await createConfigAuthentication(executionId, configAlias);
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
            {flag && <DP_Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />}
        </div>
    );
};

export default Authentication;
