import React from 'react';
import {render} from 'react-dom';
import { Spinner, Switch} from "@blueprintjs/core";
import { AppBar, Toolbar } from '@material-ui/core';
import SearchBox from './search';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import getPage from './page-request';
import './index.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';

import { ptBR } from '@material-ui/core/locale';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMore: true,
      isDark: true,
    };
    this.page = 1;
    this.fetchMoreData();
  };

  onSearch = () => {
    let searchData = SearchBox().props.result;
    this.setState({
      items: this.state.items.concat(searchData)
    });
  };

  onSuccess = (data) => {
    data.forEach((item) => {
      return {title: item.title, thumbnailUrl: item.thumbnailUrl};
    });
    this.setState({
      items: this.state.items.concat(data)
    });
  };

  onFailure = (msg) => {
    console.error(msg);
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }

    getPage(this.page, this.onSuccess, this.onFailure);

    this.page++;
  };

  /*
  themeControl = (bool) => {
    if (bool) {
      return ["item-div-bright", document.body.style.backgroundColor = "white"]
    } else {
      return ["item-div-dark", document.body.style.backgroundColor = "black"]
    }
  };
  */
  setDark = () => {
    if (this.state.isDark) {
      this.setState({ isDark: false });
      //return themeControl(false)[1];
    } else {
      this.setState({ isDark: true });
      //return themeControl(true)[1];
    }
  };

  render() {
    console.log(this.state.isDark);
    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    });
    let theme = createTheme({
      palette: {
        primary: {
          light: '#84ffff',
          main: '#ffffffde',
          dark: '#84ffff',
          contrastText: '#ffffffde',
        },
        secondary: {
          light: '#01579b',
          main: '#01579b',
          dark: '#01579b',
          contrastText: '#01579b',
        },
      },
      typography: {
        fontSize: 15,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
      overrides: {
        MuiFormControl: {
          root: {
            backgroundColor: "grey",
          },
        },
        MuiInputBase: { //texto escrito no imput pelo usuário
          input: {
            color: "white",
          },
        },
        MuiInputLabel: {
          animated: {
            color: "white",
          },
        },
        MuiIconButton: {
          root: {
            color: "white",
          },
        },
        MuiFilledInput: {
          root: {
            padding: '10px 10px',
          },
        },
      },
    }, ptBR);
    theme = responsiveFontSizes(theme);    
    return (
      <ThemeProvider theme={theme}>
        <div>
          <AppBar style={{backgroundColor: "#393939"}} position="static">
            <Toolbar style={{display: "grid", gridTemplateColumns: "18% 64% 18%"}}>
              <Typography align="center" variant="h6">demo: my-code-capabilities</Typography>
              <SearchBox arr={this.state.items}/>
              <div style={{display: "grid", gridTemplateColumns: "6fr 1fr"}}>
                <Typography align="right" variant="body2">Tema escuro</Typography>
                <Switch onChange={this.setDark}/>
              </div>
            </Toolbar>
          </AppBar>
          <InfiniteScroll
            className="infinite-scroll"
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={
              <div className="overlay">
                <div style={{justifyContent: "center", alignItems:"center"}}>
                  <Spinner/>
                </div>
              </div>
            }
            endMessage={
              <p>Yay! You have seen it all</p>  
            }
          >
            {this.state.items.map((v, index) => (
              <Card className={useStyles} key={index}>
                <CardMedia
                  style={{ height: "344px" }}
                  image={v.thumbnailUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Título
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {v.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </InfiniteScroll>
        </div>
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));