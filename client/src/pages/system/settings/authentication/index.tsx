import React from 'react';
import {Button} from "antd";
import {
    addExecution,
    configAuthentication,
    copyBrowserAuthentication,
    raisePriorityExecution,
    updateExecutionById
} from "../../../../api/system/authentication";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";


const Authentication: React.FC = () => {

    const alias = "DCX509"
    const configAlias = "CDCX509"


    const createDigitalCertificate = () => {
        copyBrowserAuthentication(alias).then(() => {
            addExecution(alias).then((response) => {
                const location = response.location
                const executionId = location.substring(location.lastIndexOf('/') + 1)


                configAuthentication(executionId, configAlias).then((response) => {
                    const location = response.location
                    const configId = location.substring(location.lastIndexOf('/') + 1)

                })

                updateExecutionById(alias, executionId).then(() => {
                    raisePriorityExecution(executionId).then((response) => {

                    })
                })

                getRealmInfoByRealmId("master").then((response) => {
                    updateRealmByRealmId("master", {
                        ...response,
                        browserFlow: alias
                    }).then(r => {

                    })
                })
            })
        })
    }

    return (
        <div>
            <Button onClick={createDigitalCertificate}>
                Xác thực bằng chứng chỉ số
            </Button>
        </div>
    );
};

export default Authentication;
