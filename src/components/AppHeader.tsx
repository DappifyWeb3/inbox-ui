import React from "react";
import styled from "styled-components";
import { getHeader, getCollapseIcon } from "@mui-treasury/layout";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { useRowGutterStyles } from "@mui-treasury/styles/gutter/row";
import { useGoogleAvatarStyles } from "@mui-treasury/styles/avatar/google";
import {
  Box,
  Toolbar,
  makeStyles,
  InputBase,
  IconButton,
  Avatar,
  Button, 
  Chip
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Apps from "@material-ui/icons/Apps";
import { useMoralis } from 'react-moralis';

const Header = getHeader(styled);
const CollapseIcon = getCollapseIcon(styled);

const useStyles = makeStyles({
  collapse: {
    marginLeft: -12,
    marginRight: 4,
  },
  logo: {
    height: 40,
  },
  toolbar: {
    minHeight: "64px !important",
    backgroundColor: "#fff",
    boxShadow: "inset 0 -1px 0 rgba(100,121,143,0.122)",
  },
  searchInput: {
    backgroundColor: "#f1f3f4",
    height: 48,
    borderRadius: 8,
    padding: "0 8px",
    maxWidth: 720,
    flexGrow: 1,
  },
});

declare global {
  interface Window {
    ethereum: any; // 👈️ turn off type checking
  }
}

const AppHeader = () => {
  const { isAuthenticated, user, authenticate, logout } = useMoralis();
  const styles = useStyles();
  const actionStyles = useSizedIconButtonStyles({ padding: 8, childSize: 24 });
  const gutterStyles = useRowGutterStyles({ size: 8 });
  const tinyGutterStyles = useRowGutterStyles({
    size: 2,
    before: 10,
  });
  const googleStyles = useGoogleAvatarStyles({ avatarSize: 32, ringSize: 40 });
  const avatarStyles = useSizedIconButtonStyles({ padding: 4, childSize: 32 });

  const authUser = () => {
    if (typeof window?.ethereum !== 'undefined') {
        authenticate({ signingMessage: "Web3 Inbox Authentication" });
    } else {
        authenticate({provider: 'walletconnect', signingMessage: "Web3 Inbox Authentication"});
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return address;
    return `${address.substring(0, 4)}...${address.substring(address.length-6, address.length)}`;
  }

  return (
    <Header>
      <Toolbar className={styles.toolbar}>
        <Box display={"flex"} alignItems="center">
          <img
            className={styles.logo}
            alt=""
            src="/dappify.svg"
          />Web3 Inbox
        </Box>
         {/* <Box width={100} display={"flex"} alignItems="center">
           <Chip color="primary" variant="outlined" label="Proof of Concept" />
  </Box> */}
        {/*<InputBase
          className={styles.searchInput}
          placeholder="Search mail"
          startAdornment={
            <IconButton className={gutterStyles.adjacent} classes={actionStyles}>
              <Search />
            </IconButton>
          }
          endAdornment={
            <IconButton classes={actionStyles}>
              <ArrowDropDown />
            </IconButton>
          }
        /> 
        <Box ml="auto" className={tinyGutterStyles.parent}>
          <IconButton classes={actionStyles}>
            <HelpOutline />
          </IconButton>
          <IconButton classes={actionStyles}>
            <Apps />
          </IconButton>
        </Box> */}
        <Box ml="auto" alignItems="right">
          {!isAuthenticated && (<Button color="primary" variant="contained" onClick={() => authUser()}>Connect Wallet</Button>)}
          {isAuthenticated && (<Button color="primary" variant="contained" onClick={() => logout()}>{formatAddress(user?.get('ethAddress'))}</Button>)}
        </Box>
      </Toolbar>
    </Header>
  );
};

export default AppHeader;
