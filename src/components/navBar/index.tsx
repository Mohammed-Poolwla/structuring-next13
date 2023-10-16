import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const NavBarComponent: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
    const router = useRouter();
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="demo-logo-vertical">
                <img src="/images/logo.png" alt="logo" width="160" className="logo-large" />
                <img src="/images/logo_icon.png" alt="logo" width="160" className="logo-small" />
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['users']}
                className="sidebar-menu"
                onClick={(e) => {
                    router.push(`/${e.key}`);
                }}
                items={[
                    {
                        key: 'users',
                        icon: <UserOutlined />,
                        label: 'Users'
                    }
                ]}
            />
        </Sider>
    );
};

export default NavBarComponent;
