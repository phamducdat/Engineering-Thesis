import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getClientById} from "../../../../api/clients";
import {Button, Col, Form, Input, message, Row, Select, Space} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import {FaReact} from "react-icons/fa";
import {IconContext} from 'react-icons/lib/cjs/iconContext';


const Installation: React.FC = () => {

    const {realmId, domainId} = useParams()
    const [reloadData, setReloadData] = useState(false)
    const [frameworkOptions, setFrameworkOptions] = useState(
        [
            {
                label: <>
                    <IconContext.Provider
                        value={{color: 'blue'}}
                    >
                        <div className="anticon anticon-copy">
                            <FaReact/>
                        </div>
                    </IconContext.Provider> React (JS)
                </>,
                key: "react",
                value: "react"
            }
        ]
    )
    const [clientData, setClientData] = useState({})

    function initData() {

        getClientById(realmId, domainId).then((response) => {
            setClientData({
                url: 'http://localhost:8080/auth',
                realm: realmId,
                clientId: response.clientId
            })
        })
    }

    useEffect(() => {
        initData();
    }, [])


    useEffect(() => {
        if (reloadData) {
            initData()
            setReloadData(false)
        }
    }, [reloadData])

    const copyToClipboard = () => {
        try {
            navigator.clipboard.writeText(JSON.stringify(clientData, null, 2));
            message.success('Copy thành công');
        } catch (err) {
            message.error('Có lỗi xảy ra');
        }
    };

    return (
        <>


            <Space direction="vertical" style={{display: 'flex'}}>

                <Row>
                    <Col span={7}>
                        <Form.Item
                            label="Framework"
                            name="framework"
                            initialValue={"react"}
                        >
                            <Select
                                style={{width: '100%'}}
                                options={frameworkOptions}
                                defaultValue={"react"}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {clientData !== undefined && <Button
                    icon={<CopyOutlined/>}
                    onClick={copyToClipboard}
                    type={"primary"}
                >
                    Copy
                </Button>
                }
                <Row>
                    <Col span={8}>
                        <Input.TextArea
                            autoSize={true}
                            value={JSON.stringify(clientData, null, 2)}
                        />
                    </Col>
                </Row>
            </Space>
        </>

    );
};

export default Installation;
