import React from "react";
import { Layout, Menu } from "antd";
import "./layout.css";

const { Header, Content, Footer } = Layout;

const DesignLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(4).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                    })}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">{props?.content}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
};

export default DesignLayout;