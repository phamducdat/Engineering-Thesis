import React, {useEffect, useState} from "react";
import {Image, Menu, Row} from "antd";
import Sider from "antd/es/layout/Sider";
import {items} from "./items";
import {useLocation} from "react-router-dom";


const DP_Sider: React.FC<{}> = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        if (path.includes('managers/user'))
            setSelectedKeys(['user'])
        if (path.includes('managers/domain'))
            setSelectedKeys(['domain'])
        if (path.includes('system/sessions'))
            setSelectedKeys(['sessions'])
        if (path.includes('system/settings'))
            setSelectedKeys(['settings'])


    }, [location.pathname])

    return <>
        <Sider
            collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
            style={{
                height: '100vh',
                overflow: "hidden",
            }}
        >
            <Row align={"middle"}
                 justify={"space-around"}
            >
                <Image
                    src={'/dp-logo.png'}
                    style={{background: "unset", padding: "8px"}}
                    preview={false}
                    height={64}
                />
            </Row>
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={selectedKeys}
            />
        </Sider>
    </>
}

export default DP_Sider