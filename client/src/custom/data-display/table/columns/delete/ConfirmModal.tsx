import React from 'react';
import {Modal, ModalProps} from "antd";

export interface ConfirmModalProps extends ModalProps {
    content: string
    type: string
    description?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                       content,
                                                       type,
                                                       description,
                                                       ...rest
                                                   }) => {
    return (
        <div>
            <Modal
                {...rest}
                title={`Xóa ${type}`}
                okText={"Xóa"}
                okType={'danger'}
            >
                Bạn có chắc chắn muốn xóa: {content}?
                {description}
            </Modal>
        </div>
    );
};

export default ConfirmModal;
