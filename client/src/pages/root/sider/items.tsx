import {AppstoreOutlined, GlobalOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";

export const items: ItemType[] = [
    {
        key: "manager",
        label: "Quản lý",
        type: "group",
        children: [
            {
                key: 'domain',
                icon: <AppstoreOutlined/>,
                label: <Link to={"managers/domain"}>
                    Domain
                </Link>
            },
            {
                key: 'user',
                icon: <UserOutlined/>,
                label: <Link to={"managers/user"}>
                    Tài khoản
                </Link>
            },
        ]
    },
    {
        key: "system",
        label: "Hệ thống",
        type: 'group',
        children: [
            {
                key: "sessions",
                icon: <SettingOutlined/>,
                label: <Link to={"system/sessions"}>
                    Phiên hoạt động
                </Link>

            },
            {
                key: "settings",
                icon: <GlobalOutlined />,
                label: <Link to={"system/settings"}>
                    Hệ thống
                </Link>

            }
        ]
    },

]