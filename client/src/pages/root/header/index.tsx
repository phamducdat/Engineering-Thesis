import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import {Avatar, Button, Col, Dropdown, Input, MenuProps, Row, Typography} from "antd";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useRootContext} from "../context/useRootContext";
import {getMe, logout} from "../../../api/admin";


const DP_Header: React.FC<{}> = (props) => {
    let navigate = useNavigate()
    const {title} = useRootContext()
    const {realmId} = useParams()
    const [searchParams] = useSearchParams()
    const [searchValue, setSearchValue] = useState<string | undefined>(searchParams.get('search') ?? undefined)
    let timeout: NodeJS.Timeout | null = null;
    // const handleSearch = debounce((value: string) => {
    //     console.log("dat with value = ", value)
    //     if (value !== null && value !== undefined && value !== "") {
    //         searchParams.set('search', value)
    //     } else {
    //         searchParams.delete('search')
    //     }
    //     navigate(`?${searchParams.toString()}`)
    // }, 1000);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchValue(value)
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            if (value !== null && value !== undefined && value !== "") {
                searchParams.set('search', value)
            } else {
                searchParams.delete('search')
            }
            navigate(`?${searchParams.toString()}`)
        }, 1000);
    };

    useEffect(() => {
        setSearchValue(searchParams.get('search') ?? undefined)
    }, [])

    useEffect(() => {
        document.title = title + " - DP"
    }, [title])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const {value} = e.target;
    //     setSearchValue(value)
    //     handleSearch(value);
    // };

    const items: MenuProps['items'] = [
        {
            key: "logout",
            label: <Button type={"text"}
                           onClick={() => {
                               logout(realmId).then((response) => {
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
                        <Input.Search
                            placeholder={"Tìm kiếm"}
                            value={searchValue}
                            onChange={handleChange}
                            allowClear
                        />
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