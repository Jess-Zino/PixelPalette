import { Menu, Typography, Button, Layout } from "antd";
import {
  DashboardOutlined,
  GiftOutlined,
  TrophyOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { Sider } = Layout;

const Navbar = () => {
  const username = localStorage.getItem("pixelpalette");
  const navigate = useNavigate();
  const { Title } = Typography;



  return (
    <div
      className={`Navbar`}
    >
     

      <div className="logo">
       
          <h1 style={{ color: "white", fontFamily: "Fuggles" }}>
            Pix <span style={{ color: "#efb764" }}>Pal</span>
          </h1>
      
      </div>
     
      <Menu
        className="nav"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline" 
        inlineCollapsed={true}
        theme="dark"
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[

          {
            label: (
              <Typography>
                <Title level={5} style={{ color: "white" }}>
                  {username}
                </Title>
              </Typography>
            ),
            disabled: "true",
            icon: <UserOutlined style={{ fontSize: "20px", color: "#efb764" }} />,
          },
          {
            label: <span style={{ color: "white", fontWeight: "400" }}>Gallery</span>,
            icon: <DashboardOutlined style={{ fontSize: "20px", color: "#efb764" }} />,
            key: "/gallery",
          },
          {
            label:<span style={{ color: "white", fontWeight: "400" }}>Logout</span>,
            icon: <LogoutOutlined style={{ fontSize: "20px", color: "#efb764" }} />,
            key: "/",
          },
        ]}
      />
    </div>
  );
};

export default Navbar;
