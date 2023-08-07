import axios, {AxiosRequestConfig} from "axios";
import qs from "qs";
import {message} from "antd";
import {getMe} from "../../api/admin";
import {convertWarningMessage} from "./util";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    captureLocationHeader?: boolean;
    disableMessage?: boolean;

    customMessage?: {
        message: string;
        type: 'success' | 'warning' | 'error'
    }
}

const getKeycloakURL = () => localStorage.getItem('keycloakUrl') || undefined;
const getExternalServerURL = () => process.env.REACT_APP_KEYCLOAK_EXTERNAL_URL;


const createCustomAxios = (getBaseURL: () => string | undefined) => {
    const instance = axios.create({
        baseURL: getBaseURL() || undefined,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    });

    instance.interceptors.request.use(
        async (config) => {
            const token = await refreshAccessToken();
            config.baseURL = getBaseURL() || undefined;
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            } as any;
            return config;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
        (response) => {
            const config = response?.config as CustomAxiosRequestConfig;
            if (config.disableMessage == undefined || !config.disableMessage) {
                if (config.customMessage) {
                    if (config.customMessage.type === "success") {
                        message.success(config.customMessage.message)
                    }

                    if (config.customMessage.type === "warning") {
                        message.warning(config.customMessage.message)
                    }
                    if (config.customMessage.type === "error") {
                        message.error(config.customMessage.message)
                    }

                } else if (config.method !== "get") {
                    if (config.method === "post")
                        message.success("Tạo mới thành công")
                    if (config.method === "put")
                        message.success("Cập nhật thành công")
                    if (config.method === "delete")
                        message.success("Xóa thành công")
                }
            }
            if (config.captureLocationHeader) {
                response.data = {
                    ...response.data,
                    location: response.headers.location,
                };
            }
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            const config = error?.config as CustomAxiosRequestConfig;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newToken = await refreshAccessToken();

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return DP_keycloakAxios(originalRequest);
                } catch (e) {
                    // Make sure to throw this error so it gets handled upstream
                    throw e;
                }
            } else {
                if (config.disableMessage == undefined || !config.disableMessage) {
                    message.warning(convertWarningMessage(error.response?.data.errorMessage))
                }
            }

            // Unhandled error, throw it to make sure it gets caught somewhere
            throw error;
        }
    );

    return instance;
}


export const refreshAccessToken = async () => {
    const data = {
        client_id: 'admin-cli',
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem("refresh_token")
    }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: 'no-referrer',
    };
    try {
        const iss = getMe().iss;
        const realmId = iss.substring(iss.lastIndexOf('/') + 1)
        const response = await axios.post(
            `${localStorage.getItem("keycloakUrl")}/realms/${realmId}/protocol/openid-connect/token/`,
            qs.stringify(data),
            config
        );

        localStorage.setItem('access_token', response.data?.access_token);

        return response.data?.access_token;
    } catch (error) {
        localStorage.clear()
        if (window.location.pathname != "/login" && window.location.pathname != "/registration") {
            window.location.href = '/login';
        }
    }
}

export const DP_keycloakAxios = createCustomAxios(getKeycloakURL);
export const DP_externalServerAxios = createCustomAxios(getExternalServerURL);

