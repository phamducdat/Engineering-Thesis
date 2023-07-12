import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createUser} from "../../../api/user";
import {useRootContext} from "../../root/context/useRootContext";
import {mode, UserContent} from "./UserContent";

export const CreateUser: React.FC = () => {

    const {realmId} = useParams()
    const {setTitle} = useRootContext()
    let navigate = useNavigate()


    useEffect(() => {
        setTitle("Tạo mới nhân sự")
    }, [])

    const onFinish = (value: object) => {
        createUser(realmId, {
            ...value,
            "enabled": true,
            "attributes": {},
            "groups": [],
            "emailVerified": ""
        }).then((response) => {
            const location = response.location
            const userId = location.substring(location.lastIndexOf('/') + 1)
            navigate(`/realm/${realmId}/managers/user/${userId}?tab-key=userDetails`)
        })
    }

    return (
        <>
            <UserContent
                onFinish={onFinish}
                mode={mode.Create}
            />
        </>
    );
};