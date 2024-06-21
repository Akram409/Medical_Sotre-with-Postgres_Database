import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import GetDoctor from "../../Menu/Get/GetDoctor";
import GetCustomer from "../../Menu/Get/GetCustomer";
import GetMEDICAL_SHOP from "../../Menu/Get/GetMEDICAL_SHOP";

const { Header, Content, Sider } = Layout;

const labels = ["Get", "Create", "Update", "Delete"];
const menus = [
  ["Doctor", "Customer", "MEDICAL_SHOP", "EMPLOYEES", "INVENTORY", "COMPANIES", "PAYMENT_HISTORY", "SUPPLIER", "SUPPLY_HISTORY"],
  ["Doctor", "Customer", "MEDICAL_SHOP", "EMPLOYEES", "INVENTORY", "COMPANIES", "PAYMENT_HISTORY", "SUPPLIER", "SUPPLY_HISTORY"],
  ["Doctor", "Customer", "MEDICAL_SHOP", "EMPLOYEES", "INVENTORY", "COMPANIES", "PAYMENT_HISTORY", "SUPPLIER", "SUPPLY_HISTORY"],
  ["Doctor", "Customer", "MEDICAL_SHOP", "EMPLOYEES", "INVENTORY", "COMPANIES", "PAYMENT_HISTORY", "SUPPLIER", "SUPPLY_HISTORY"]
];

const icons = [UserOutlined, LaptopOutlined, NotificationOutlined, UserOutlined];

const items2 = icons.map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: labels[index],
    children: menus[index].map((label, j) => {
      const subKey = `${index}-${j}`;
      return {
        key: subKey,
        label: label,
      };
    }),
  };
});

const componentMapping = {
  '0-0': <GetDoctor />,
  '0-1': <GetCustomer />,
  '0-2': <GetMEDICAL_SHOP />,
};



const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("0-0");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const renderContent = () => {
    return <div>{componentMapping[selectedMenuItem] || "Default Content"}</div>;
  };

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div className="text-2xl font-semibold">
            <DatabaseOutlined /> DBMS
            </div>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: "dark",
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["0-0"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 570,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderContent()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
