import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';

import { tokens } from "../../Theme"
// import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import {
  HomeOutlined as HomeOutlinedIcon,
//   PeopleOutlined as PeopleOutlinedIcon,
//   ContactsOutlined as ContactsOutlinedIcon,
//   ReceiptOutlined as ReceiptOutlinedIcon,
  CalendarTodayOutlined as CalendarTodayOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
//   BarChartOutlined as BarChartOutlinedIcon,
//   PieChartOutlined as PieChartOutlinedIcon,
//   TimelineOutlined as TimelineOutlinedIcon,
//   MapOutlined as MapOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
  ExitToAppOutlined as LogoutIcon,
//   UpdateOutlined as UpdateIcon,
  AssessmentOutlined as AssessmentOutlinedIcon,
} from '@mui/icons-material';

const Item = ({ title, to, icon, selected, setSelected, onPress }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors?.gray[100],
      }}
      onClick={() => {
        setSelected(title)
        navigate(to)
        if (onPress) onPress()
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>

    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const menuItems = [
    { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
    // { title: "Manage Team", to: "/team", icon: <PeopleOutlinedIcon /> },
    // { title: "Contacts Information", to: "/contacts", icon: <ContactsOutlinedIcon /> },
    // { title: "Project Expenses", to: "/expense", icon: <ReceiptOutlinedIcon /> },
    { title: "Calendar", to: "/calendar", icon: <CalendarTodayOutlinedIcon /> },
    // // { title: "Update Hub", to: "/update", icon: <UpdateIcon /> },
    // { title: "Ranking Chart", to: "/bar", icon: <BarChartOutlinedIcon /> },
    // { title: "Team Karma", to: "/pie", icon: <PieChartOutlinedIcon /> },
    // { title: "Profit Analysis", to: "/line", icon: <TimelineOutlinedIcon /> },
    // { title: "Geography Chart", to: "/geography", icon: <MapOutlinedIcon /> },
    { title: "Project Overview", to: "/pulse", icon: <AssessmentOutlinedIcon />},
    //  { title: "Catalog", to: "/catalog/:id", icon: <LibraryBooksOutlinedIcon /> },
    { title: "FAQ Page", to: "/faq", icon: <HelpOutlineOutlinedIcon /> },
    { title: "Logout", to: "/logout", icon: <LogoutIcon /> },
    
  ];


  return (
    <Box
      sx={{
        height: "100vh",
        marginTop: '-125px', 
        "& .pro-sidebar-inner": {
          backgroundColor: "transparent !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
      }}
    >
      <ProSidebar collapsed={!isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.gray[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuItems.map((item) => (
              <Item
                key={item.title}
                title={item.title}
                to={item.to}
                icon={item.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
