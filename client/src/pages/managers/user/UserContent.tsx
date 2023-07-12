import React, {useEffect, useState} from "react";
import {DP_Form} from "../../../custom/data-entry/form";
import {Button, Col, Form, FormProps, Input, Row, Switch} from "antd";

export enum mode {
    Create,
    Update

}

interface UserContentProps extends FormProps {
    userData?: object
    mode: mode
}

export const UserContent: React.FC<UserContentProps> = props => {

    const [form] = Form.useForm()
    const [isFormChanged, setIsFormChanged] = useState(false)


    useEffect(() => {
        setIsFormChanged(false)
        form.setFieldsValue(props.userData)
    }, [form, props.userData])

    return (
        <>
            <DP_Form
                {...props}
                form={form}
                onFieldsChange={() => {
                    setIsFormChanged(true)
                }}
            >

                {props.mode === mode.Update && <Row>
                    <Col span={8}>
                        <Form.Item
                            label="ID"
                            name="id"
                        >
                            <Input disabled={props.mode === mode.Update}/>
                        </Form.Item>
                    </Col>
                </Row>}

                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Tên tài khoản"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input disabled={props.mode === mode.Update}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <Form.Item
                            label={"Email"}
                            name="email"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={4}>
                        <Form.Item
                            label={"Họ"}
                            name="firstName"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item
                            label={"Tên"}
                            name="lastName"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>

                    <Col span={8}>
                        <Form.Item
                            label={"Trạng thái"}
                            name="enabled"
                            valuePropName={"checked"}
                            initialValue={true}
                        >
                            <Switch/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item wrapperCol={{span: 4}}>
                    <Button type="primary" htmlType="submit"
                            disabled={!isFormChanged}
                    >
                        Đồng ý
                    </Button>
                </Form.Item>

            </DP_Form>
        </>
    );
};