import React, {useEffect} from "react";
import {Header} from "antd/es/layout/layout";
import {Avatar, Button, Col, Dropdown, MenuProps, Row, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useRootContext} from "../context/useRootContext";
import {getMe, logout} from "../../../api/admin";
import Search from "./Search";


const DP_Header: React.FC<{}> = (props) => {
    let navigate = useNavigate()
    const {title} = useRootContext()
    const {realmId} = useParams()

    useEffect(() => {
        document.title = title + " - DP"
    }, [title])


    const items: MenuProps['items'] = [
        {
            key: "logout",
            label: <Button type={"text"}
                           onClick={() => {
                               logout(realmId).then((response) => {
                                   localStorage.clear()
                                   navigate("/login")
                               })
                           }}
            >
                Đăng xuất
            </Button>
        }
    ]
    return (
        <>
            <Header style={{padding: 0, background: 'white'}}>
                <Row align={"top"} justify={"space-between"} style={{
                    marginLeft: "16px",
                    marginRight: "16px"
                }}>
                    <Col span={10}>
                        <Typography.Title level={3} style={{marginTop: "16px"}}>
                            {title}
                        </Typography.Title>
                    </Col>

                    <Col span={6}
                         style={{marginTop: "16px"}}
                    >
                        <Search/>
                    </Col>

                    <Col>
                        <Dropdown menu={{items}}>
                            <Avatar style={{backgroundColor: '#1890ff'}}>
                                {getMe().preferred_username}
                            </Avatar>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>

        </>
    )
}

export default DP_Header