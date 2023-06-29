import DP_axios from "../../custom/axios";
import axios from "axios";

const baseExternalUrl = `${process.env.REACT_APP_KEYCLOAK_EXTERNAL_URL}/external/v1`


export const loginAdminAccount = async (data: any) => {
    const response = await axios.post(`${baseExternalUrl}/admin/keycloak/login`, data)
    return response?.data || []
}


export const createClient = async (data: any) => {
    const response = await DP_axios.post(`${baseExternalUrl}/admin/keycloak/clients`, data)
    return response?.data || []
}


export const updateClient = async (id: string | undefined, data: any) => {
    const response = await DP_axios.put(`${baseExternalUrl}/admin/keycloak/clients/${id}`, data)
    return response?.data || []
}


export const registration = async (data: any) => {
    const response = await DP_axios.post(`${baseExternalUrl}/registrations`, data)
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
    const response = await DP_axios.get(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`)
    return response?.data || []
}

export const getClientUsersByClientId = async (realmId: string | undefined,
                                               clientId: string | undefined) => {
    const response = await DP_axios.get(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`)
    return response?.data || []
}

export const createUserClients = async (realmId: string | undefined,
                                        userId: string | undefined,
                                        data: object) => {
    const response = await DP_axios.post(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`, data)
    return response?.data
}

export const createClientUsers = async (realmId: string | undefined,
                                        clientId: string | undefined,
                                        data: object) => {
    const response = await DP_axios.post(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`, data)
    return response?.data
}

export const deleteUserClients = async (
    realmId: string | undefined,
    userId: string | undefined,
    data: object
) => {
    const response = await DP_axios.delete(`${baseExternalUrl}/admin/realms/${realmId}/users/${userId}`, {
        data: data
    });
    return response?.data;
};

export const deleteClientUsers = async (
    realmId: string | undefined,
    clientId: string | undefined,
    data: object
) => {
    const response = await DP_axios.delete(`${baseExternalUrl}/admin/realms/${realmId}/clients/${clientId}`, {
        data: data
    });
    return response?.data;
}