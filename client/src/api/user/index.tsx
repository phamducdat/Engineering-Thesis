import DP_axios, {CustomAxiosRequestConfig} from "../../custom/axios";

const baseExternalUrl = `${process.env.REACT_APP_KEYCLOAK_EXTERNAL_URL}/external/v1`
export const getUsersWithoutAdmin = async (realm: string | undefined) => {
    const response = await DP_axios.get(`${baseExternalUrl}/admin/realms/${realm}/users`)
    return response?.data
}


export const getUserById = async (realm: string | undefined,
                                  userId: string | undefined) => {
    const response = await DP_axios.get(`/admin/realms/${realm}/users/${userId}`)
    return response?.data
}

export const getUserCredentialsById = async (realm: string | undefined,
                                             userId: string | undefined) => {
    const response = await DP_axios.get(`/admin/realms/${realm}/users/${userId}/credentials`)
    return response?.data
}

export const createUser = async (realm: string | undefined,
                                 data: object) => {
    const config: CustomAxiosRequestConfig = {captureLocationHeader: true}
    const response = await DP_axios.post(`/admin/realms/${realm}/users`, data,
        config)
    return response?.data
}

export const updateUser = async (realm: string | undefined,
                                 userId: string | undefined,
                                 data: object) => {
    const response = await DP_axios.put(`/admin/realms/${realm}/users/${userId}`, data)
    return response?.data
}

export const resetPassword = async (realm: string | undefined,
                                    userid: string | undefined,
                                    data: object) => {
    const config: CustomAxiosRequestConfig = {
        customMessage: {
            type: 'success',
            message: "Cập nhật mật khẩu thành công"
        }
    }
    const response = await DP_axios.put(`/admin/realms/${realm}/users/${userid}/reset-password`, data, config)
    return response?.data
}


export const deleteUser = async (realm: string | undefined,
                                 userid: string) => {
    const response = await DP_axios.delete(`/admin/realms/${realm}/users/${userid}`)
    return response?.data
}

export const getSessionsByUserId = async (realm: string | undefined,
                                          userId: string | undefined) => {
    const response = await DP_axios.get(`/admin/realms/${realm}/users/${userId}/sessions`)
    return response?.data
}

export const logoutUserSessionSessionId = async (realm: string | undefined,
                                                 sessionId: string | undefined) => {
    const response = await DP_axios.delete(`/admin/realms/${realm}/sessions/${sessionId}`)
    return response?.data
}

export const logoutUserByUserId = async (realmId: string | undefined,
                                         userId: string | undefined) => {
    const response = await DP_axios.post(`/admin/realms/${realmId}/users/${userId}/logout`)
    return response?.data
}