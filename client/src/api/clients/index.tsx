import {DP_keycloakAxios} from "../../custom/axios";


export const getAllClients = async (realmId: string | undefined,
                                    params: object = {}) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/clients`, {
        params
    });
    return response.data || []
}

export const getClientById = async (realmId: string | undefined,
                                    clientId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/clients/${clientId}`)
    return response?.data || []
}


// export const createClient = async (realmId: string | undefined, data: object) => {
//     const response = await DP_axios.post(`/admin/realms/${realmId}/clients`, data)
//     return response?.data || []
// }
//
export const updateClientById = async (realmId: string | undefined,
                                       clientId: string | undefined,
                                       data: any) => {
    const response = await DP_keycloakAxios.put(`/admin/realms/${realmId}/clients/${clientId}`, data)
    return response?.data || []
}


export const deleteClient = async (realmId: string | undefined, clientId: string | undefined) => {
    const response = await DP_keycloakAxios.delete(`/admin/realms/${realmId}/clients/${clientId}`)
    return response?.data || []
}

export const getOdicKeycloakJSON = async (realmId: string | undefined,
                                          clientId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/clients/${clientId}/installation/providers/keycloak-oidc-keycloak-json`)
    return response?.data || []
}

export const getClientSecret = async (realmId: string | undefined,
                                      clientId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/clients/${clientId}/client-secret/`)
    return response?.data || []
}

export const generateClientSecret = async (realmId: string | undefined,
                                           clientId: string | undefined) => {
    const response = await DP_keycloakAxios.post(`/admin/realms/${realmId}/clients/${clientId}/client-secret/`)
    return response?.data || []
}

export const getUserSessionsByClientId = async (realmId: string | undefined,
                                                clientId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/clients/${clientId}/user-sessions`)
    return response?.data || []
}

export const getAllClientSessions = async (realmId: string | undefined,
                                           params: object = {}) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}/client-session-stats`,
        {params})
    return response?.data || []
}
