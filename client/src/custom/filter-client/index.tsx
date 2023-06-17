export const filterClient = (value: any) => {
    return value.filter((item: any) =>
        item.clientId !== 'account'
        && item.clientId !== "account-console"
        && item.clientId !== "admin-cli"
        && item.clientId !== "broker"
        && item.clientId !== "realm-manager"
        && item.clientId !== "security-admin-console"
        && item.clientId !== "realm-management"
        && item.clientId !== "master-realm"
        && item.clientId !== "test-realm"
    )
}