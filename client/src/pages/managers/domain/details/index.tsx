import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getClientById} from "../../../../api/clients";
import {Button, Col, Form, Input, Row, Tabs} from "antd";
import {useRootContext} from "../../../root/context/useRootContext";
import {DP_Form} from "../../../../custom/data-entry/form";
import DP_Tabs from "../../../../custom/data-display/tabs";
import UserSession from "./UserSession";
import {PermissionTransfer} from "./PermissionTransfer";
import {updateClient} from "../../../../api/external";
import TabPane = Tabs.TabPane;


const DomainDetails: React.FC<{}> = (props) => {

    const {realmId, domainId} = useParams()
    const {setTitle} = useRootContext()
    const [form] = Form.useForm()
    const [isFormChanged, setIsFormChanged] = useState(false)
    const [loading, setLoading] = useState(false)

    function getDomainData() {
        setIsFormChanged(false)
        getClientById(realmId, domainId).then((response) => {
            form.setFieldsValue({
                ...response,
                url: response?.webOrigins[0]
            })
            setTitle(`Thông tin domain: ${response?.clientId}`)
        })
    }

    useEffect(() => {
        getDomainData();
    }, [])

    const onFinish = (value: any) => {
        setLoading(true)
        updateClient(domainId, value).then((response) => {
            getDomainData();
            setLoading(false)
        }).finally(() => {
            setLoading(false)
        })

    }

    const isValidURL = (inputURL: any) => {
        try {
            let url = new URL(inputURL);
            return !(url.pathname !== '/' || url.search !== '' || url.hash !== '' || inputURL.endsWith('/'));

        } catch (error) {
            return false;
        }
    }

    return (
        <div>
            <DP_Tabs>
                <TabPane key={"details"} tab={"Chi tiết"}>
                    <DP_Form form={form}
                             onFinish={onFinish}
                             onFieldsChange={() => {
                                 setIsFormChanged(true)
                             }}
                    >
                        <Row>
                            <Col span="8">
                                <Form.Item
                                    label={"Domain Id"}
                                    name={"clientId"}
                                    rules={[
                                        {
                                            message: "Vui lòng nhập Domain Id",
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="8">
                                <Form.Item
                                    label={"Đường dẫn:"}
                                    name={"url"}
                                    rules={[
                                        {
                                            message: "Vui lòng nhập đường dẫn",
                                            required: true
                                        },
                                        () => ({
                                            validator(_, value) {
                                                if (isValidURL(value)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Đường dẫn không đúng định dạng, ví dụ: http://example.com'));
                                            },
                                        })
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{span: 4}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!isFormChanged}
                                loading={loading}
                            >
                                Đồng ý
                            </Button>
                        </Form.Item>
                    </DP_Form>
                </TabPane>

                <TabPane key="permissions" tab="Phân quyền">
                    <PermissionTransfer/>
                </TabPane>
                <TabPane key={"session"} tab={"Phiên hoạt động"}>
                    <UserSession/>
                </TabPane>

                {/*<TabPane key={"revocation"} tab={"Thu hồi"}>*/}
                {/*    <Revocation/>*/}
                {/*</TabPane>*/}


            </DP_Tabs>
        </div>
    );
};

export default DomainDetails;