import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {deleteUserCredentialById, getUserCredentialsById, resetPassword, updateUser} from "../../../../api/user";
import {DP_Form} from "../../../../custom/data-entry/form";
import {Button, Col, Form, Input, Modal, Row, Switch} from "antd";
import {ExclamationCircleOutlined, RedoOutlined} from "@ant-design/icons";

interface UserCredentialsProps {
    userData: any; // Update the type 'any' to the appropriate type for your userData
}


const UserCredentials: React.FC<UserCredentialsProps> = props => {
    const {realmId, userId} = useParams();
    const [passwordCredentialId, setPasswordCredentialId] = useState(null)
    const [otpCredentialId, setOtpCredentialId] = useState(null)
    const [isFormChanged, setIsFormChanged] = useState(false)
    const [form] = Form.useForm()
    const userData = props.userData

    function getData() {
        form.resetFields()
        setIsFormChanged(false)
        setPasswordCredentialId(null)
        setOtpCredentialId(null)
        getUserCredentialsById(realmId, userId).then((response: any) => {
            if (response.length > 0) {
                const isHasBeenSetPassword = response.filter((element: any) => element.type === 'password')
                setPasswordCredentialId(isHasBeenSetPassword[0].id)

                const isHasBeenSetOTP = response.filter((element: any) => element.type === 'otp')
                setOtpCredentialId(isHasBeenSetOTP[0].id)
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

    const handleOnResetOTPConfig = () => {
        Modal.confirm({
            title: "Bạn có chắn chắn muốn yêu cầu thiết lập lại xác thực bằng mã OTP của tài khoản: " + userData.username,
            icon: <ExclamationCircleOutlined/>,
            onOk: () => {
                deleteUserCredentialById(realmId, userId, otpCredentialId, true).then(() => {
                    updateUser(realmId, userId, {
                        ...userData,
                        "requiredActions": [
                            "CONFIGURE_TOTP"
                        ],
                    }).then(() => {
                        getData()
                    })
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
            <DP_Form
                form={form}
                onFinish={onFinish}
                onFieldsChange={() => {
                    setIsFormChanged(true)
                }}
            >
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

                <Button style={{marginBottom: "24px"}}
                        icon={<RedoOutlined/>}
                        onClick={handleOnResetOTPConfig}
                        disabled={!otpCredentialId}
                >
                    Thiết lập lại xác thực OTP
                </Button>

                <Col span={6}>
                    <Row gutter={24} justify={"space-between"}>
                        <Col>
                            <Form.Item wrapperCol={{span: 4}}>
                                <Button type="primary"
                                        htmlType="submit"
                                        disabled={!isFormChanged}
                                >
                                    Thiết lập mật khẩu
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
