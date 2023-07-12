import React, {useEffect, useState} from 'react';
import {getRealmInfoByRealmId} from "../../../../api/realms";
import {useParams} from "react-router-dom";
import {Button, Col, Form, Input, Row} from "antd";
import {useRootContext} from "../../../root/context/useRootContext";
import {DP_Form} from "../../../../custom/data-entry/form";


const OTPPolicy: React.FC = () => {
    const {realmId} = useParams()
    const {setTitle} = useRootContext()
    const [form] = Form.useForm()
    const [fieldsChange, setFieldsChange] = useState(false)

    function getData() {
        getRealmInfoByRealmId(realmId).then((response) => {
            form.setFieldsValue(response)
        })
    }

    useEffect(() => {
        setTitle("Cài đặt OTP")
        getData();
    }, [])

    const onFinish = (value: any) => {

    }

    return (<>
            <DP_Form
                // layout={"horizontal"}
                form={form}
                onFieldsChange={() => {
                    setFieldsChange(true)
                }}
                onFinish={onFinish}
                // labelCol={{ span: 10 }}
                // wrapperCol={{ span: 10 }}
            >
                <Row gutter={12}>
                    <Col span={5}>
                        <Form.Item
                            label={'Loại OTP'}
                            // labelCol={'5'}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={5}>
                        <Form.Item
                            label={'Số lượng chữ số'}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={5}>
                        <Form.Item
                            label={'Thời gian mã thông báo'}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{span: 4}}>
                    <Button
                        disabled={!fieldsChange}
                        type="primary" htmlType="submit">
                        Đồng ý
                    </Button>
                </Form.Item>
            </DP_Form>
        </>

    );
};

export default OTPPolicy;
