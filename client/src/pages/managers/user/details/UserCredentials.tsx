import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {deleteUserCredentialById, getUserCredentialsById, resetPassword} from "../../../../api/user";
import {DP_Form} from "../../../../custom/data-entry/form";
import {Button, Col, Form, Input, Modal, Row, Switch} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

interface UserCredentialsProps {
    userData: any; // Update the type 'any' to the appropriate type for your userData
}


const UserCredentials: React.FC<UserCredentialsProps> = props => {
    const {realmId, userId} = useParams();
    const [passwordCredentialId, setPasswordCredentialId] = useState(null)
    const userData = props.userData

    function getData() {
        setPasswordCredentialId(null)
        getUserCredentialsById(realmId, userId).then((response: any) => {
            if (response.length > 0) {
                const isHasBeenSet = response.filter((element: any) => element.type === 'password')
                setPasswordCredentialId(isHasBeenSet[0].id)
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])


    const handleOnDeletePassword = () => {
        Modal.confirm({
            title: "Bạn có chắn chắn muốn xóa mật khẩu của tài khoản: " + userData.username,
            icon: <ExclamationCircleOutlined/>,
            onOk: () => {
                deleteUserCredentialById(realmId, userId, passwordCredentialId).then(() => {
                    getData()
                })
            }
        })
    }

    const onFinish = (value: any) => {
        delete value.confirm
        resetPassword(realmId, userId, value).then(() => {
            getData()
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
                            <Input.Password
                                placeholder={passwordCredentialId ? "************" : "Nhập mật khẩu"}
                            />
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
                            <Input.Password
                                placeholder={passwordCredentialId ? "************" : "Nhập lại mật khẩu"}

                            />
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

                <Col span={6}>
                    <Row gutter={24} justify={"space-between"}>
                        <Col>
                            <Form.Item wrapperCol={{span: 4}}>
                                <Button type="primary" htmlType="submit">
                                    Đặt lại mật khẩu
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item wrapperCol={{span: 4}}>
                                <Button danger
                                        disabled={!passwordCredentialId}
                                        onClick={handleOnDeletePassword}
                                >
                                    Xóa mật khẩu
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </DP_Form>
        </div>
    );
};

export default UserCredentials;
