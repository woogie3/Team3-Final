import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import ShowManagementAdd from './ShowManagementAdd';
import TroupManagementAdd from './TroupManagementAdd';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItem } from '@material-ui/core';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import '../css/RegistorationMenu.css';
import { ThemeProvider } from '@material-ui/styles';
import HeaderMenu from '../components/HeaderMenu';




const drawerWidth = 200;

const theme = createMuiTheme({
  palette: {
    primary : {
      main: '#01579b',
    },
    secondary: {
      main: '#212121',
    }
  },
});

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
        whiteSpace: 'nowrap',
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      top: 'auto'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }));

const RegistorationMenu = ({match}) => {
    const classes = useStyles();

    return(
      <ThemeProvider theme ={theme}>
        <HeaderMenu/>
        <div className={classes.root}>
        <CssBaseline />
            <Drawer
           className={classes.drawer}
           variant="permanent"
           classes={{
             paper: classes.drawerPaper,
           }}
          >
            <div className={classes.toolbar} />
            <List>
            <NavLink to={`${match.path}/showManagementAdd`}><ListItem button ><ListItemIcon><AddToQueueIcon/></ListItemIcon><ListItemText secondary="상영작등록"/></ListItem></NavLink>
           <NavLink to={`${match.path}/troupManagementAdd`}><ListItem button><ListItemIcon><GroupAddIcon/></ListItemIcon><ListItemText secondary="극단등록"/></ListItem></NavLink>
           </List>
           <Divider />
            </Drawer>
           
           <Route exact path={match.path} render={()=>(<br/>)}/>
           <Route path={`${match.path}/showManagementAdd`} component={ShowManagementAdd}/>
           <Route path={`${match.path}/troupManagementAdd`} component={TroupManagementAdd}/>
           
        </div>
        </ThemeProvider>
    );
}

export default RegistorationMenu;
    
        
        


