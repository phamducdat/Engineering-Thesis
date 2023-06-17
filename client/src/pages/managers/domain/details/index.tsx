import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getClientById, updateClientById} from "../../../../api/clients";
import {Button, Col, Form, Input, Row, Tabs} from "antd";
import {useRootContext} from "../../../root/context/useRootContext";
import {DP_Form} from "../../../../custom/data-entry/form";
import DP_Tabs from "../../../../custom/data-display/tabs";
import Installation from "./Installation";
import UserSession from "./UserSession";
import Revocation from "./Revocation";
import TabPane = Tabs.TabPane;
import {PermissionTransfer} from "./PermissionTransfer";


const DomainDetails: React.FC<{}> = (props) => {

    const {realmId, domainId} = useParams()
    const {setTitle} = useRootContext()
    const [form] = Form.useForm()
    useEffect(() => {
        getClientById(realmId, domainId).then((response) => {
            form.setFieldsValue(response)
            setTitle(`Thông tin domain: ${response?.clientId}`)
        })


    }, [])

    const onFinish = (value: any) => {
        updateClientById(realmId, domainId, value).then((response) => {
        })
    }

    return (
        <div>
            <DP_Tabs>
                <TabPane key={"details"} tab={"Chi tiết"}>
                    <DP_Form form={form}
                             onFinish={onFinish}
                    >
                        <Row>
                            <Col span="6">
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
                            <Col span="6">
                                <Form.Item
                                    label={"Đường dẫn:"}
                                    name={"rootUrl"}
                                    rules={[
                                        {
                                            message: "Vui lòng nhập đường dẫn",
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{span: 4}}>
                            <Button type="primary" htmlType="submit">
                                Đồng ý
                            </Button>
                        </Form.Item>
                    </DP_Form>
                </TabPane>
                {/*<TabPane key={"installation"} tab={"Cài đặt"}>*/}
                {/*    <Installation/>*/}
                {/*</TabPane>*/}

                <TabPane key="permissions" tab="Phân quyền">
                    <PermissionTransfer/>
                </TabPane>
                <TabPane key={"session"} tab={"Phiên hoạt động"}>
                    <UserSession/>
                </TabPane>


                <TabPane key={"revocation"} tab={"Thu hồi"}>
                    <Revocation/>
                </TabPane>


            </DP_Tabs>
        </div>
    );
};

export default DomainDetails;