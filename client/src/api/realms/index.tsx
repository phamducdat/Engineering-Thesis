import DP_axios from "../../custom/axios";

export const getAllRealms = async () => {
    const response = await DP_axios.get("admin/realms")
    return response.data || []
}


export const getRealmInfoByRealmId = async (realmId: string | undefined) => {
    const response = await DP_axios.get(`/admin/realms/${realmId}`)
    return response.data
}

export const updateRealmByRealmId = async (realmId: string | undefined, data: object) => {
    const response = await DP_axios.put(`/admin/realms/${realmId}`, data)
    return response.data
}

export const removeAllUserSessions = async (realmName: string | undefined) => {
    const response = await DP_axios.post(`/admin/realms/${realmName}/logout-all`)
    return response.data
}

export const getRealmBriefRepresentation = async () => {
    const response = await DP_axios.get(`/admin/realms?briefRepresentation=true`)
    return response.data
}


