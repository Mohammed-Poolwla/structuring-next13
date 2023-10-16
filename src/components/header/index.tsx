import React from 'react';
import { Button, theme, Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
const { Header } = Layout;

const HeaderComponent: React.FC<{ collapsed: boolean; toggleCollapsed: () => void }> = ({
    collapsed,
    toggleCollapsed
}) => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const { data } = useSession();

    const menu = (
        <Menu>
            <Menu.Item key="profile">
                <UserOutlined className="mr-2" /> Profile
            </Menu.Item>
            <Menu.Item key="logout" onClick={() => signOut()}>
                <LogoutOutlined className="mr-2" /> Logout
            </Menu.Item>
        </Menu>
    );

    const user = data?.user;

    return (
        <Header className="site-header">
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64
                }}
            />
            <div className="header-right flex items-center">
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="flex items-center cursor-pointer">
                        <Avatar size={40} src={user?.image} icon={<UserOutlined />}>
                            {user?.name}
                        </Avatar>
                        <div className="ml-2 leading-5">
                            <span className="font-bold text-gray-700 text-sm">{user?.name}</span>
                            <br />
                            <span className="text-gray-500 text-xs">{user?.email}</span>
                        </div>
                        <DownOutlined className="ml-1" />
                    </div>
                </Dropdown>
                {/* <Button onClick={() => signOut()} className="logout-btn ml-2 ">
                    <LoginOutlined />
                </Button> */}
            </div>
        </Header>
    );
};

export default HeaderComponent;
