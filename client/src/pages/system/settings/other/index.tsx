import React, {useEffect, useState} from 'react';
import {DP_Form} from "../../../../custom/data-entry/form";
import {Button, Form, InputNumber, Switch} from "antd";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {useParams} from "react-router-dom";
import {useRootContext} from "../../../root/context/useRootContext";


const Other: React.FC = () => {

    const {realmId} = useParams()
    const {setTitle} = useRootContext()
    const [form] = Form.useForm()
    const [fieldsChange, setFieldsChange] = useState(false)
    const [options, setOptions] = useState({
        accessTokenLifespanStyle: 'minutes',
    })


    function getData() {
        getRealmInfoByRealmId(realmId).then((response) => {
            form.setFieldsValue(convertDataToForm(response))
        })
    }

    useEffect(() => {
        setTitle("Cài đặt khác")
        getData();
    }, [])

    const convertDataToForm = (value: any) => {
        return {
            ...value,
            accessTokenLifespan: value?.accessTokenLifespan / 60
        }
    }

    const convertDataFormToValue = (value: any) => {
        return {
            ...value,
            accessTokenLifespan: value?.accessTokenLifespan * 60
        }
    }

    const onFinish = (value: any) => {
        updateRealmByRealmId(realmId,
            convertDataFormToValue(value)).then(() => {
            setFieldsChange(false)
        })
    }


    return (
        <>
            <DP_Form
                layout={"horizontal"}
                form={form}
                onFieldsChange={() => {
                    setFieldsChange(true)
                }}
                labelCol={{span: 7}}
                labelAlign={"left"}
                style={{maxWidth: 600}}
                wrapperCol={{span: 10}}

                onFinish={onFinish}
            >
                <Form.Item
                    label={"Ghi nhớ đăng nhập"}
                    labelCol={{span:10}}
                    name="rememberMe"
                    valuePropName={"checked"}
                >
                    <Switch/>
                </Form.Item>

                <Form.Item
                    label={"Đăng nhập bằng email"}
                    labelCol={{span:10}}
                    name="loginWithEmailAllowed"
                    valuePropName={"checked"}
                >
                    <Switch/>
                </Form.Item>

                <Form.Item
                    label={"Thời gian hiệu lực token (phút)"}
                    name={"accessTokenLifespan"}
                    labelCol={{span:10}}
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value < 30) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Thời gian hiệu lực token không được vượt quá 30'));
                            },
                        }),
                    ]}
                >
                    <InputNumber

                    />
                </Form.Item>

                {/*<Select*/}
                {/*    style={{width: '100%'}}*/}
                {/*    value={options.accessTokenLifespanStyle}*/}
                {/*    onChange={(value) => setOptions({*/}
                {/*        ...options,*/}
                {/*        accessTokenLifespanStyle: value*/}
                {/*    })}*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            value: 'minutes',*/}
                {/*            label: 'Phút',*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}

                <Form.Item wrapperCol={{span: 4}}>
                    <Button
                        disabled={!fieldsChange}
                        type="primary" htmlType="submit">
                        Đồng ý
                    </Button>
                </Form.Item>
            </DP_Form>
        </>
    );
};

export default Other;
