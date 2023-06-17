import React, {useEffect} from "react";
import {refreshAccessToken} from "../../custom/axios";
import {useNavigate} from "react-router-dom";
import {getMe} from "../../api/admin";

export const Home: React.FC = props => {

    let navigate = useNavigate()

    useEffect(() => {
        refreshAccessToken().then((response) => {
            if (response !== undefined) {
                const iss = getMe().iss;
                const realmId = iss.substring(iss.lastIndexOf('/') + 1)
                navigate(`/realm/${realmId}/managers/domain`)
            }
        })
    }, [])

    return (
        <>

        </>
    );
};