import DP_axios, {CustomAxiosRequestConfig} from "../../../custom/axios";

export const copyBrowserAuthentication = async (newName: string) => {
    const response = await DP_axios.post("/admin/realms/master/authentication/flows/browser/copy", {
        newName: newName
    })
    return response.data || []
}


export const addExecution = async (newName: string) => {
    const config: CustomAxiosRequestConfig = {captureLocationHeader: true}
    const response = await DP_axios.post(`/admin/realms/master/authentication/flows/${newName}/executions/execution`, {
        provider: "auth-x509-client-username-form"
    }, config)
    return response.data || []
}


export const raisePriorityExecution = async (executionId: string) => {
    const response = await DP_axios.post(`/admin/realms/master/authentication/executions/${executionId}/raise-priority`,
        {"realm": "master", "execution": executionId})
    return response.data || []
}

export const lowerPriorityExecution = async (executionId: string) => {
    const response = await DP_axios.post(`/admin/realms/master/authentication/executions/${executionId}/lower-priority`,
        {"realm": "master", "execution": executionId})
    return response.data || []
}

export const getExecutionById = async (executionId: string) => {
    const response = await DP_axios.get(`/admin/realms/master/authentication/executions/${executionId}`)
    return response.data || []
}

export const configAuthentication = async (executionId: string, configAlias: string) => {
    const config: CustomAxiosRequestConfig = {captureLocationHeader: true}
    const response = await DP_axios.post(`/admin/realms/master/authentication/executions/${executionId}/config`,
        {
            "config": {
                "x509-cert-auth.mapping-source-selection": "Subject's e-mail",
                "x509-cert-auth.canonical-dn-enabled": "false",
                "x509-cert-auth.serialnumber-hex-enabled": "false",
                "x509-cert-auth.regular-expression": "(.*?)(?:$)",
                "x509-cert-auth.mapper-selection": "Username or Email",
                "x509-cert-auth.mapper-selection.user-attribute-name": "usercertificate",
                "x509-cert-auth.timestamp-validation-enabled": "true",
                "x509-cert-auth.crl-checking-enabled": "",
                "x509-cert-auth.crldp-checking-enabled": "false",
                "x509-cert-auth.crl-relative-path": "crl.pem",
                "x509-cert-auth.ocsp-checking-enabled": "",
                "x509-cert-auth.ocsp-fail-open": "false",
                "x509-cert-auth.confirmation-page-disallowed": "",
                "x509-cert-auth.revalidate-certificate-enabled": "",
                "x509-cert-auth.certificate-policy-mode": "All"
            }, "alias": configAlias
        }, config)
    return response.data || []
}

export const updateExecutionById = async (flowName:string, executionId: string) => {
    const response = await DP_axios.put(`/admin/realms/master/authentication/flows/${flowName}/executions`, {
        index: 3,
        id: executionId,
        requirement: "ALTERNATIVE"
    })
    return response.data || []
}