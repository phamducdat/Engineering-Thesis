import axios from "axios";
import qs from 'qs';
import jwt from 'jwt-decode'
import {message} from "antd";

const baseExternalUrl = `${process.env.REACT_APP_KEYCLOAK_EXTERNAL_URL}/external/v1`

interface JwtInfo {
    acr: string;
    "allowed-origins": string;
    asp: string;
    email_verified: boolean;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    preferred_username: string;
    scope: string;
    session_state: string;
    sid: string;
    sub: string;
    typ: string;
}

export const getRealmByUsername = async (username: string) => {
    const response =
        await axios.get(`${baseExternalUrl}/accounts/${username}`)

    return response.data
}


export const getMe = () => {
    return jwt(localStorage.getItem("access_token") ?? '') as JwtInfo
}


export const getToken = async (realm: string, username: string, password: string) => {
    const data = {
        client_id: 'admin-cli',
        grant_type: 'password',
        username: username,
        password: password
    };
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'http://localhost:3000',

        },
        withCredentials: true,
        referrerPolicy: 'no-referrer',
    };

    try {
        const response = await axios.post(
            `${localStorage.getItem("keycloakUrl")}/realms/${realm}/protocol/openid-connect/token/`,
            qs.stringify(data),
            config
        );

        return response.data;
    } catch (error: any) {
        if (error.response.status === 401)
            message.warning('Thông tin đăng nhập không chính xác, vui lòng kiểm tra lại tài khoản hoặc mật khẩu!')
        else
            message.warning(error?.response.data.error_description);
    }
}

export const logout = async (realm: string | undefined) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    }

    const info = jwt(localStorage.getItem("access_token") ?? '') as JwtInfo
    const response = await axios.post(`${localStorage.getItem("keycloakUrl")}/admin/realms/${realm}/users/${info.sub}/logout`
        , null, config)
    return response.data;
}