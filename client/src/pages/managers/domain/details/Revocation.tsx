import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {DP_Form} from "../../../../custom/data-entry/form";
import dayjs from "dayjs";
import {getClientById, updateClientById} from "../../../../api/clients";
import {useParams} from "react-router-dom";


const Revocation: React.FC = () => {
    const [form] = Form.useForm()
    const {realmId, domainId} = useParams()
    const [notBeforeValue, setNotBeforeValue] = useState("Nonce")
    const [clientData, setClientData] = useState({})

    function getClientData() {
        getClientById(realmId, domainId).then((response) => {
            setClientData(response)
            if (response.notBefore) {
                setNotBeforeValue(dayjs.unix(response.notBefore).toString())
            } else {
                setNotBeforeValue("Nonce")
            }
        })
    }

    useEffect(() => {
        getClientData();
    }, [])
    const handleOnSetAtThisPoint = (clear: boolean) => {
        let value
        if (clear) {
            value = {
                ...clientData,
                notBefore: 0
            };
        } else {
            const currentTime = dayjs()
            value = {
                ...clientData,
                notBefore: currentTime.valueOf() / 1000,
            };
        }
        updateClientById(realmId, domainId, value).then(() => {
            getClientData()
        })
    }


    return (
        <DP_Form form={form}
                 layout={"horizontal"}
        >
            <Form.Item
                label="Từ sau"
            >
                <Input disabled placeholder={notBeforeValue}/>
            </Form.Item>

            <Row gutter={12}>
                <Col>
                    <Form.Item wrapperCol={{span: 4}}>
                        <Button onClick={() => handleOnSetAtThisPoint(true)}>
                            Clear
                        </Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item wrapperCol={{span: 4}}>
                        <Button type="primary" onClick={() => handleOnSetAtThisPoint(false)}>
                            Thiết lập từ thời điểm hiện tại
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </DP_Form>
    );
};

export default Revocation;
