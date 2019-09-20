import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from '@material-ui/core/Grid';
import AccountCircle from "@material-ui/icons/AccountCircle";

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    anchorOriginVertical: 'bottom',
    anchorOriginHorizontal: 'right',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'right',
    anchorReference: 'anchorEl',
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes}>
        <AppBar position="static">
          <Toolbar>
            <Grid item xs={12}>
              <Typography type="title" variant="h5" color="inherit" className={classes}>
                SALAMANTEX-ADMIN-UI
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle
                      fontSize="inherit"
                      style={{ fontSize: "50px" }}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>UserName</MenuItem>
                    <MenuItem onClick={this.handleClose}>logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header