import React from "react";
import IconRowList from "./IconRowList";

import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function QuickActions() {
  const data = [
    {
      title: "Analytics & Insights",
      leftIcon: <DashboardIcon color="primary" />,
      rightIcon: <ArrowForwardIosIcon fontSize="small" />,
    },
    {
      title: "User Management",
      leftIcon: <PeopleIcon color="primary" />,
      rightIcon: <ArrowForwardIosIcon fontSize="small" />,
    },
    {
      title: "Project Management",
      leftIcon: <AnalyticsIcon color="primary" />,
      rightIcon: <ArrowForwardIosIcon fontSize="small" />,
    },
    {
      title: "Reports & Export",
      leftIcon: <SettingsIcon color="primary" />,
      rightIcon: <ArrowForwardIosIcon fontSize="small" />,
    },
    {
      title: "Notification & Alerts",
      leftIcon: <HomeIcon color="primary" />,
      rightIcon: <ArrowForwardIosIcon fontSize="small" />,
    },
  ];

  return <IconRowList items={data} />;
}
