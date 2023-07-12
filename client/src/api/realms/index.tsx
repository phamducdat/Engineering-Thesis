import {CustomAxiosRequestConfig, DP_keycloakAxios} from "../../custom/axios"

export const getAllRealms = async () => {
    const response = await DP_keycloakAxios.get("admin/realms")
    return response.data || []
}


export const getRealmInfoByRealmId = async (realmId: string | undefined) => {
    const response = await DP_keycloakAxios.get(`/admin/realms/${realmId}`)
    return response.data
}

export const updateRealmByRealmId = async (realmId: string | undefined,
                                           data: object,
                                           disableMessage: boolean = false) => {
    const config: CustomAxiosRequestConfig = {disableMessage: disableMessage}
    const response = await DP_keycloakAxios.put(`/admin/realms/${realmId}`, data, config)
    return response.data
}

export const removeAllUserSessions = async (realmName: string | undefined) => {
    const response = await DP_keycloakAxios.post(`/admin/realms/${realmName}/logout-all`)
    return response.data
}

export const getRealmBriefRepresentation = async () => {
    const response = await DP_keycloakAxios.get(`/admin/realms?briefRepresentation=true`)
    return response.data
}


