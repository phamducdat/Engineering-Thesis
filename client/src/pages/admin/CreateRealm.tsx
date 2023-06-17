import React from "react";
import {Form, Input, Modal, ModalProps} from "antd";

export const CreateRealmModal: React.FC<ModalProps> = props => {
    return (
        <>
            <Modal {...props}
                   title={"Tạo mới"}
            >
                <Form layout={'vertical'}>
                    <Form.Item
                        label={"Tên"}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={"Domain"}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};