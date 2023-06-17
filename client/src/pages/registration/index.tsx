import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Form, Input, Row} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {AiOutlineMail} from 'react-icons/ai';
import {registration} from "../../api/external";

const Registration: React.FC = () => {
    let navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = "Đăng ký - DP"
    }, [])

    const onFinish = (values: any) => {
        delete values.confirm;
        setLoading(true)
        registration(values).then((response) => {
        }).finally(() => {
            setLoading(false)
        })

    };
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpeg'})`,
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover'
        }}>
            <Card
                style={{
                    width: 400, position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
                title={"Đăng ký"}
            >
                <Form
                    form={form}
                    name="basic"
                    style={{
                        textAlign: "center",
                    }}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Vui lòng nhập email'}]}
                    >
                        <Input prefix={<AiOutlineMail
                            className="site-form-item-icon"

                        />} placeholder="Email"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('2 mật khẩu không trùng khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    name="firstName"*/}
                    {/*>*/}
                    {/*    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Họ"/>*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item*/}
                    {/*    name="lastName"*/}
                    {/*>*/}
                    {/*    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Tên"/>*/}
                    {/*</Form.Item>*/}
                </Form>

                <Row justify={"space-between"}>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={() => {
                                form.submit()
                            }}
                            loading={loading}
                    >
                        Đăng ký
                    </Button>

                    <Button
                        onClick={() => {
                            navigate("/login")
                        }}
                    >
                        Đăng nhập
                    </Button>
                </Row>

            </Card>
        </div>
    )
};

export default Registration;
