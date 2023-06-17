import React, {useState} from 'react';
import {Layout, Spin} from 'antd';
import DP_Sider from "./sider";
import DP_Header from "./header";
import {Outlet} from "react-router-dom";
import {RootContext} from "./context/root-context";

const {Header, Content, Footer} = Layout;


const RootPage: React.FC = () => {
    const [title, setTitle] = useState("Title");
    const [reloadData, setReloadData] = useState(null)
    const [spinning, setSpinning] = useState(false)


    return (
        <RootContext.Provider value={{
            title,
            setTitle,
            reloadData,
            setReloadData,
            spinning,
            setSpinning
        }}>
            <Layout style={{minHeight: '100vh'}}>
                <DP_Sider/>
                <Layout style={{height: "100vh"}}>
                    <DP_Header/>
                    <Spin spinning={spinning}>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                overflow: "auto",
                                background: "white",
                                borderRadius: "8px",
                                height:"85vh"
                            }}
                        >
                            <Outlet/>
                        </Content>
                    </Spin>
                </Layout>
            </Layout>
        </RootContext.Provider>

    )
        ;
};

export default RootPage;