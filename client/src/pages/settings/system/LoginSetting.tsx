import React, {useEffect} from 'react';
import {Button, Form, Switch} from "antd";
import {DP_Form} from "../../../custom/data-entry/form";
import {useSettingContext} from "./context/useSettingContext";


const LoginSetting: React.FC = () => {
    const [form] = Form.useForm()
    const {realmData} = useSettingContext()


    useEffect(() => {
        form.setFieldsValue({
            name: 'login',
        })
    }, [form])


    const onFinish = (value: any) => {
    }


    return (
        <div>
            <DP_Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item

                >
                    <Switch/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 4}}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </DP_Form>
        </div>
    );
};

export default LoginSetting;
