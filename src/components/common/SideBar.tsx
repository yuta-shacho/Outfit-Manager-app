import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import React, { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { auth } from "../../firebase";

interface SideBarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

function SideBar({
  drawerWidth,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: SideBarProps) {
  const MenuItems: menuItem[] = [
    { text: "Home", path: "/", icon: CheckroomIcon },
    { text: "Report", path: "/report", icon: EqualizerIcon },
  ];

  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)",
  };

  const user = useAppSelector((state) => state.user);

  const drawer = (
    <div>
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid2 sx={{ paddingTop: "10px" }}>
          <img
            src={user?.photo}
            alt=""
            style={{ borderRadius: "50%", width: "70px" }}
          />
        </Grid2>
        <Grid2 sx={{ paddingLeft: "4px", paddingRight: "2px" }}>
          <Typography sx={{ wordBreak: "break-word" }}>
            {user?.displayName}
          </Typography>
        </Grid2>
        <Grid2 sx={{ paddingBottom: "20px" }}>
          <Button
            onClick={() => auth.signOut()}
            color={"error"}
            variant="contained"
          >
            サインアウト
          </Button>
        </Grid2>
      </Grid2>

      <Divider />
      <List>
        {MenuItems.map((item, index) => (
          <NavLink
            key={item.text}
            to={item.path}
            style={({ isActive }) => {
              return { ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) };
            }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* モバイル用 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* PC用 */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default SideBar;
