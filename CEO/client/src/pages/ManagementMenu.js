import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import TicketManagement from './TicketManagement';
import ReviewManagement from './ReviewManagement';
import TroupManagement from './TroupManagement';
import ShowManagement from './ShowManagement';
import TroupManagementUpdate from './TroupManagementUpdate';
import TroupUpdate from '../components/TroupUpdate'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItem } from '@material-ui/core';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
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
  overrides:{
    MuiTableCell:{
      head:{
        fontWeight: 'bolder',
        lineHeight: '1.5rem',
      },
      root:{
        textAlign: 'center',
        fontSize: '15px',
        paddingRight: '4px',
        paddingLeft: '4px',
      }
    },
  }
}
);

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      zIndex: 1200,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 1200,
      position:'fixed',
      top:'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }));

const ManagementMenu = ({match}) => {
    const classes = useStyles();
    return (
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
                <NavLink to={`${match.path}/ticketManagement`}><ListItem button><ListItemIcon><LocalMoviesIcon/></ListItemIcon><ListItemText secondary="예매관리"/></ListItem></NavLink>
                <NavLink to={`${match.path}/reviewManagement`}><ListItem button><ListItemIcon><LibraryBooksIcon/></ListItemIcon><ListItemText secondary="리뷰관리"/></ListItem></NavLink>
                <NavLink to={`${match.path}/troupManagement`}><ListItem button><ListItemIcon><PeopleIcon/></ListItemIcon><ListItemText secondary="극단관리"/></ListItem></NavLink>
                <NavLink to={`${match.path}/showManagement`}><ListItem button><ListItemIcon><MovieIcon/></ListItemIcon><ListItemText secondary="상영작관리"/></ListItem></NavLink>
                </List>
                <Divider/>
           </Drawer>
           

           <Route exact path={match.path} render={()=>(<br/>)}/>
           <Route path={`${match.path}/ticketManagement`} component={TicketManagement}/>
           <Route path={`${match.path}/reviewManagement`} component={ReviewManagement}/>
           <Route path={`${match.path}/troupManagement`} component={TroupManagement}/>
           <Route path={`${match.path}/showManagement`} component={ShowManagement}/>
           <Route path={`${match.path}/troupManagementUpdate`} component={TroupManagementUpdate}/>
           <Route path={`${match.path}/update`} component={TroupUpdate}/>

        </div>
        </ThemeProvider>
    );
};

export default ManagementMenu;