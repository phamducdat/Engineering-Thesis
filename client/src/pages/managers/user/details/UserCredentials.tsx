import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getUserCredentialsById, resetPassword} from "../../../../api/user";
import {DP_Form} from "../../../../custom/data-entry/form";
import {Button, Col, Form, Input, Row, Switch} from "antd";


const UserCredentials: React.FC = () => {
    const {realmId, userId} = useParams();

    useEffect(() => {
        getUserCredentialsById(realmId, userId).then((response) => {
        })
    }, [])


    const onFinish = (value: any) => {
        delete value.confirm
        resetPassword(realmId, userId, value).then(() => {
        })
    }


    return (
        <div>
            <DP_Form onFinish={onFinish}>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            label={"Mật khẩu"}
                            name={"value"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu'
                                }
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={6}>
                        <Form.Item
                            label={"Nhập lại mật khẩu"}
                            name={"confirm"}
                            dependencies={['value']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu',
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('value') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('2 mật khẩu không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label={"Tạm thời"}
                    name={"temporary"}
                    valuePropName="checked"
                >
                    <Switch/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 4}}>
                    <Button type="primary" htmlType="submit">
                        Đặt lại mật khẩu
                    </Button>
                </Form.Item>
            </DP_Form>
        </div>
    );
};

export default UserCredentials;
