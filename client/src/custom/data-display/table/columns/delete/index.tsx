import React, {useState} from 'react';
import {Button} from "antd";
import ConfirmModal from "./ConfirmModal";
import {DeleteOutlined} from "@ant-design/icons";

export interface DeleteOptionProps {
    type: string,
    content: string,
    onOk: () => void,
    description?: string
}

const DeleteOption: React.FC<DeleteOptionProps> = (
    props) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button icon={<DeleteOutlined/>}
                    onClick={() => {
                        setOpen(true)
                    }}
            />
            <ConfirmModal content={props.content}
                          type={props.type}
                          open={open}
                          onCancel={() => {
                              setOpen(false)
                          }}
                          onOk={() => {
                              props.onOk()
                              setOpen(false)
                          }}
                          description={props?.description}
            />
        </div>

    );
};

export default DeleteOption;
