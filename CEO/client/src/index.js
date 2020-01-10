import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme ({
    typography: {
        fontFamily:'"Noto Sans KRm serif',
    }
})

ReactDOM.render(<MuiThemeProvider theme ={theme}><CssBaseline/><Root/></MuiThemeProvider>, document.getElementById('root'));
serviceWorker.unregister();
