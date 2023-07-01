import React, {useState} from 'react';
import {Button} from "antd";
import {
    addExecution,
    configAuthentication,
    copyBrowserAuthentication,
    raisePriorityExecution,
    updateExecutionById
} from "../../../../api/system";
import {getRealmInfoByRealmId, updateRealmByRealmId} from "../../../../api/realms";


const Authentication: React.FC = () => {

    const [alias, setAlias] = useState(makeid())


    const onClick = () => {
        copyBrowserAuthentication(alias).then(() => {
            addExecution(alias).then((response) => {
                const location = response.location
                const executionId = location.substring(location.lastIndexOf('/') + 1)

                raisePriorityExecution(executionId).then((response) => {

                })

                configAuthentication(executionId).then((response) => {
                    const location = response.location
                    const configId = location.substring(location.lastIndexOf('/') + 1)

                })

                updateExecutionById(alias, executionId).then(() => {

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

    function makeid() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    return (
        <div>
            <Button onClick={onClick}>
                Xác thực bằng chứng chỉ số
            </Button>
        </div>
    );
};

export default Authentication;
