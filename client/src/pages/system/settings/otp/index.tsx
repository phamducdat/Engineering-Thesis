import React, {useEffect, useState} from 'react';
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {useParams} from "react-router-dom";
import {Button, Form, InputNumber, Select} from "antd";
import {useRootContext} from "../../../root/context/useRootContext";
import {DP_Form} from "../../../../custom/data-entry/form";


const OTPPolicy: React.FC = () => {
    const {realmId} = useParams()
    const {setTitle} = useRootContext()
    const [form] = Form.useForm()
    const [fieldsChange, setFieldsChange] = useState(false)
    const [realmData, setRealmData] = useState<object>()

    function getData() {
        getRealmInfoByRealmId(realmId).then((response) => {
            setRealmData(response)
            form.setFieldsValue(response)
        })
    }

    useEffect(() => {
        setTitle("Cài đặt OTP")
        getData();
    }, [])


    const onFinish = (value: any) => {
        updateRealmByRealmId(realmId, {
            ...realmData,
            ...value
        }).then((response) => {
            getData()
        })
    }


    return (<>
            <DP_Form
                layout={"horizontal"}
                labelCol={{span: 8}}
                wrapperCol={{span: 12}}
                style={{maxWidth: 600}}
                form={form}
                onFieldsChange={() => {
                    setFieldsChange(true)

                    if (form.getFieldValue('otpPolicyDigits').toString() === '8'
                        ||
                        (form.getFieldValue('otpPolicyType') === 'hotp')
                        ||
                        (form.getFieldValue('otpPolicyPeriod') !== 30)
                    )
                        form.setFieldValue('otpSupportedApplications', ["FreeOTP"])

                    else
                        form.setFieldValue('otpSupportedApplications', ["FreeOTP", "Google Authenticator"])
                }}
                onFinish={onFinish}
                labelAlign={"left"}

            >
                <Form.Item
                    label={'Loại OTP'}
                    name={'otpPolicyType'}
                >
                    <Select options={[
                        {
                            value: 'totp',
                            label: 'Thời gian'
                        },
                        {
                            value: 'hotp',
                            label: 'Bộ đếm'
                        }

                    ]}/>
                </Form.Item>
                <Form.Item
                    label={'Số lượng chữ số'}
                    name={'otpPolicyDigits'}
                >
                    <Select options={[
                        {
                            value: '6',
                            label: '6'
                        },
                        {
                            value: '8',
                            label: '8'
                        }
                    ]}/>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.otpPolicyType !== currentValues.otpPolicyType}
                >
                    {({getFieldValue}) =>
                        getFieldValue('otpPolicyType') === 'totp' ? (
                            <Form.Item name="otpPolicyPeriod"
                                       label="Thời gian mã thông báo"

                            >
                                <InputNumber
                                    min={1}
                                    style={{width: '100%'}}
                                />
                            </Form.Item>
                        ) : <Form.Item name="otpPolicyInitialCounter"
                                       label="Thời gian bắt đầu đếm"
                                       rules={[
                                           () => ({
                                               validator(_, value) {
                                                   if (value !== 0) {
                                                       return Promise.resolve();
                                                   }
                                                   return Promise.reject(new Error('Vui lòng nhập số lớn hơn '));
                                               },
                                           }),
                                       ]}
                        >
                            <InputNumber
                                min={0}
                                style={{width: '100%'}}
                            />
                        </Form.Item>
                    }
                </Form.Item>

                <Form.Item
                    label={'Hỗ trợ'}
                    name={'otpSupportedApplications'}
                >
                    <Select
                        mode="multiple"
                        options={[
                            {
                                value: 'FreeOTP',
                                label: 'FreeOTP',
                            },
                            {
                                value: 'Google Authenticator',
                                label: 'Google Authenticator'
                            }
                        ]}
                        disabled
                    />
                </Form.Item>
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

export default OTPPolicy;
