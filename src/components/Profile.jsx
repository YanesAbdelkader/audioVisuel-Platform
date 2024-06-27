import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: (
      <Link  to="/profile/0">
        My Courses
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link  to="/profile/1">
        History
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link  to="/profile/2">
        Settings
      </Link>
    ),
  },
  {
    key: '4',
    danger: true,
    label: (
      <Link  to="/profile/logout">
        Logout
      </Link>
    ),
  },
];

const Profile = () => {
  const menu = (
    <Menu>
      {items.map(item => (
        <Menu.Item key={item.key} danger={item.danger}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Space>
              Profile <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </>
  );
};

export default Profile;