import React from 'react';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ShowInfo from '../components/ShowInfo';
import ExcludeShow from '../components/ExcludeShow';
import AddWishlist from '../components/AddWishlist';
import ShowReview from '../components/ShowReview';
import ShowOthers from '../components/ShowOthers';
import Ticketing from '../components/Ticketing';
import TheaterLocation from '../components/TheaterLocation';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { NavLink, Route, withRouter } from 'react-router-dom';
import '../css/ShowDetail.css';

 const ShowDetail = ({match}) => {
    const activeStyle = {
        color: '#9e9e9e',
        //fontSize: '1.5rem'
    };    
    
    let show_id = match.params.show_id;
        let link = 'main';

        return (
            <ExpansionPanelDetails>
                <Table>
                    <Route path={`/${link}/:show_id/ShowInfo`} component={ShowInfo}/>
                    <Route path={`/${link}/:show_id/TheaterLocation`} component={TheaterLocation}/>
                    <Route path={`/${link}/:show_id/ShowReview`} component={ShowReview}/>
                    <Route path={`/${link}/:show_id/ShowOthers`} component={ShowOthers}/>
                <TableRow>
                    <Ticketing className="middle-nav" show_id={show_id}/>
                    <AddWishlist className="middle-nav" show_id={show_id}/>
                    <ExcludeShow className="middle-nav" show_id={show_id}/>
                </TableRow>
                <TableRow>
                    <NavLink className="bottom-nav" to={`/${link}/${show_id}/ShowInfo`} activeStyle={activeStyle}>공연정보 </NavLink>
                    <NavLink className="bottom-nav" to={`/${link}/${show_id}/TheaterLocation`} activeStyle={activeStyle}>극장위치</NavLink>
                    <NavLink className="bottom-nav" to={`/${link}/${show_id}/ShowReview`} activeStyle={activeStyle}>리뷰 </NavLink>
                    <NavLink className="bottom-nav" to={`/${link}/${show_id}/ShowOthers`} activeStyle={activeStyle}>극단의 다른 작품</NavLink>
                </TableRow>
                </Table>
            </ExpansionPanelDetails>
        )
    }
export default withRouter(ShowDetail);