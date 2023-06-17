import React, {useEffect} from "react";
import {Form, Input, Modal, ModalProps, Switch} from "antd";
import {resetPassword} from "../../../api/user";
import {useParams} from "react-router-dom";
import {DP_Form} from "../../../custom/data-entry/form";

interface Props extends ModalProps {
    userId?: string;
}

export const ResetPasswordModal: React.FC<Props> = props => {

    const [form] = Form.useForm()
    const {realmId} = useParams()


    useEffect(() => {
        form.resetFields()
    }, [props.open])

    const onFinish = (value: object) => {
        resetPassword(realmId, props.userId, value).then(() => {
            // @ts-ignore
            return props?.onCancel?.(undefined);
        })
    }

    return (
        <>
            <Modal {...props}
                   onOk={() => {
                       form.submit()
                   }}
            >
                <DP_Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name={"value"}
                        label={"Mật khẩu mới"}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={"Tạm thời"}
                        name={"temporary"}
                        valuePropName="checked"
                    >
                        <Switch/>
                    </Form.Item>


                </DP_Form>
            </Modal>
        </>
    );
};