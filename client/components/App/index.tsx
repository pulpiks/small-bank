import React, { PureComponent, Fragment, createElement, ReactElement } from 'react'
import { Button, Layout, Icon, Menu, List } from 'antd'


import './styles.css'

const {
    Header, Footer, Content,
} = Layout

const { Item } = Menu

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header className="header">
                    Small bank&nbsp;&nbsp;
                </Header>
                <Layout className="content">
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer>
                    Ksenia Lvova ©{new Date().getFullYear()}
                </Footer>
            </div>
        )
    }
}
