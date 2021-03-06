import React from "react";
import styled from "styled-components";
import { Grid, Typography, Link, makeStyles, Box } from "@material-ui/core";
import { getFooter } from "@mui-treasury/layout";

const useTextStyles = makeStyles({
  root: {
    fontSize: 12,
    color: "#666",
  },
});

const Footer = getFooter(styled);

const AppFooter = () => {
  const classes = useTextStyles();
  return (
    <Footer>
      <Box px={'1rem'} my={'1rem'}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} alignItems="center" style={{ textAlign: 'center'}}>
            <Typography classes={classes}>
              Do you have feedback?
            </Typography>
            <Link classes={classes} href="https://discord.gg/CYYX8yUVgc" target="_blank">Join us on discord</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center" color="#666">
              <Link classes={classes} href="https://dappify.com" target="_blank">Learn more about Dappify</Link>
            </Box>
          </Grid>
          {/*<Grid item xs={12} sm={4}>
            <Box textAlign="right">
              <Typography classes={classes}>
                Last account activity: 22 minutes ago
              </Typography>
              <Link classes={classes}>Details</Link>
            </Box>
  </Grid> */}
        </Grid>
      </Box>
    </Footer>
  );
};

export default AppFooter;
