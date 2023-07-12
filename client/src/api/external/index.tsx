import axios from "axios";
import {CustomAxiosRequestConfig, DP_externalServerAxios, DP_keycloakAxios} from "../../custom/axios";

const baseExternalUrl = `${process.env.REACT_APP_KEYCLOAK_EXTERNAL_URL}/external/v1`


export const loginAdminAccount = async (data: any) => {
    const config: CustomAxiosRequestConfig = {
        disableMessage: true
    }
    const response = await DP_externalServerAxios.post(`${baseExternalUrl}/admin/keycloak/login`, data, config)
    return response?.data || []
}


export const createClient = async (data: any) => {
    const response = await DP_externalServerAxios.post(`${baseExternalUrl}/admin/keycloak/clients`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
    return response?.data || []
}


export const updateClient = async (id: string | undefined, data: any) => {
    const response = await DP_externalServerAxios.put(`${baseExternalUrl}/admin/keycloak/clients/${id}`, data)
    return response?.data || []
}


export const registration = async (data: any) => {
    const response = await DP_keycloakAxios.post(`${baseExternalUrl}/registrations`, data)
    return response?.data || []
}


export const getKeycloakUrl = async () => {
    const response = await axios.get(`${baseExternalUrl}/admin/keycloak/info`)
    if (response) {
        localStorage.setItem("keycloakUrl", response?.data?.keycloakServerUrl)
    }
    return response?.data?.keycloakServerUrl
}

export const getUserClientByUserId = async (realmId: string | undefined,
                                            userId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`)
    return response?.data || []
}

export const getClientUsersByClientId = async (realmId: string | undefined,
                                               clientId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`)
    return response?.data || []
}

export const createUserClients = async (realmId: string | undefined,
                                        userId: string | undefined,
                                        data: object) => {
    const response = await DP_externalServerAxios.post(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`, data)
    return response?.data
}

export const createClientUsers = async (realmId: string | undefined,
                                        clientId: string | undefined,
                                        data: object) => {
    const response = await DP_externalServerAxios.post(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`, data)
    return response?.data
}

export const deleteUserClients = async (
    realmId: string | undefined,
    userId: string | undefined,
    data: object
) => {
    const response = await DP_keycloakAxios.delete(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`, {
        data: data
    });
    return response?.data;
};

export const deleteClientUsers = async (
    realmId: string | undefined,
    clientId: string | undefined,
    data: object
) => {
    const response = await DP_externalServerAxios.delete(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`, {
        data: data
    });
    return response?.data;
}