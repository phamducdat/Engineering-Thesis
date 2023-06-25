import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, message, Row} from "antd";
import {getRealmByUsername, getToken} from "../../api/admin";
import {useNavigate} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


export const Login: React.FC = () => {
    let navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = "Đăng nhập - DP"
    }, [])

    const onFinish = (values: any) => {

        setLoading(true)
        getRealmByUsername(values?.username).then((response) => {
            const realm = response.realm
            getToken(realm, values?.username, values?.password).then((response) => {
                if (response) {
                    localStorage.setItem("access_token", response?.access_token)
                    localStorage.setItem("refresh_token", response?.refresh_token)
                    localStorage.setItem("token_type", response?.token_type)
                    navigate(`/realm/${realm}/managers/domain`)
                }
            })
        }).catch((error) => {
            message.error(error.response.data.errorMessage)
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
                title={"Đăng nhập"}
            >
                <Form
                    name="basic"
                    form={form}
                    style={{
                        textAlign: "center",
                    }}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Vui lòng nhập tên đăng nhập'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Tài khoản"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                </Form>

                <Row justify={"space-between"}>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={() => {
                                form.submit()
                            }}
                            loading={loading}
                    >
                        Đăng nhập
                    </Button>

                    {/*<Button*/}
                    {/*    onClick={() => {*/}
                    {/*        navigate("/registration")*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Đăng ký*/}
                    {/*</Button>*/}
                </Row>

            </Card>
        </div>
    )
};
