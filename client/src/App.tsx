import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import RootPage from "./pages/root";
import {Login} from "./pages/login";
import {User} from "./pages/managers/user";
import {CreateUser} from "./pages/managers/user/CreateUser";
import {Index} from "./pages/managers/user/details";
import {Domain} from "./pages/managers/domain";
import {Home} from "./pages/home";
import DomainDetails from "./pages/managers/domain/details";
import {CreateClient} from "./pages/managers/domain/CreateClient";
import {refreshAccessToken} from "./custom/axios";
import Sessions from "./pages/system/sessions";
import Settings from "./pages/system/settings";
import {getKeycloakUrl} from "./api/external";

function App() {


    useEffect(() => {
        if (localStorage.getItem("keycloakUrl") === null ||
            localStorage.getItem("keycloakUrl") === "undefined")
            getKeycloakUrl().then(() => {
                refreshAccessToken().then(() => {
                })
            })
    }, [])

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/realm/:realmId"} element={<RootPage/>}>
                    <Route path={"managers"}>
                        <Route path={"domain"} element={<Domain/>}/>
                        <Route path={"domain/add"} element={<CreateClient/>}/>
                        <Route path={"domain/:domainId"} element={<DomainDetails/>}/>
                        <Route path={'user'} element={<User/>}/>
                        <Route path={'user/:userId'} element={<Index/>}/>
                        <Route path={'user/add'} element={<CreateUser/>}/>
                    </Route>
                    <Route path={'system'}>
                        <Route path={'sessions'} element={<Sessions/>}/>
                        <Route path={'settings'} element={<Settings/>}/>
                    </Route>
                </Route>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </>
    )
}

export default App;