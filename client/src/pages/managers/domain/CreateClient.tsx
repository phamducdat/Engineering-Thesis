import {Button, Col, Form, Input, ModalProps, Row} from "antd";
import React, {useEffect} from "react";
import {DP_Form} from "../../../custom/data-entry/form";
import {useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from 'uuid';
import {useRootContext} from "../../root/context/useRootContext";
import {createClient} from "../../../api/external";

export const CreateClient: React.FC<ModalProps> = props => {

    const {realmId} = useParams()
    const [form] = Form.useForm()
    const id = uuid()
    let navigate = useNavigate()
    const {setTitle} = useRootContext()


    useEffect(() => {
        setTitle("Tạo mới domain")
    }, [])

    const onFinish = (value: any) => {
        createClient({
            ...value,
            "id": id,
        }).then((response) => {
            navigate(`/realm/${realmId}/managers/domain/${id}?tab-key=permissions`)
        })
    }


    return (
        <>
            <DP_Form
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={8}>
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
                    <Col span={8}>
                        <Form.Item
                            label={"Đường dẫn:"}
                            name={"url"}
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
        </>
    );
};