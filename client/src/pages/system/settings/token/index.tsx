import React, {useEffect, useState} from 'react';
import {DP_Form} from "../../../../custom/data-entry/form";
import {Button, Col, Form, InputNumber, Row, Select} from "antd";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";
import {useParams} from "react-router-dom";
import {useRootContext} from "../../../root/context/useRootContext";


const Other: React.FC = () => {

    const {realmId} = useParams()
    const [form] = Form.useForm()
    const [fieldsChange, setFieldsChange] = useState(false)
    const [options, setOptions] = useState({
        accessTokenLifespanStyle: 'minutes',
    })

    const {setTitle} = useRootContext()


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
        updateRealmByRealmId(realmId, convertDataFormToValue(value)).then(() => {
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
                onFinish={onFinish}
            >
                <Row gutter={12}>
                    <Col span={5}>
                        <Form.Item
                            label={"Thời gian hiệu lực token"}
                            name={"accessTokenLifespan"}
                        >
                            <InputNumber
                                style={{width: '100%'}}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>

                        <Select
                            style={{width: '100%'}}
                            value={options.accessTokenLifespanStyle}
                            onChange={(value) => setOptions({
                                ...options,
                                accessTokenLifespanStyle: value
                            })}
                            options={[
                                {
                                    value: 'minutes',
                                    label: 'Phút',
                                },
                                // {
                                //     value: 'hours',
                                //     label: 'Hours',
                                // },
                                // {
                                //     value: 'days',
                                //     label: 'Days'
                                // }
                            ]}
                        />
                    </Col>
                </Row>

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
