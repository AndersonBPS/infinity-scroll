import React from 'react';
import { render } from 'react-dom';

import { Switch } from "@blueprintjs/core";
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import SearchBox from './search';

import InfiniteScroll from 'react-infinite-scroll-component';
import getPage from './page-request';

//import './index.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
//import { ptBR } from '@mui/material/locale';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMore: true,
      mode: 'light',
    };
    this.page = 1;
    this.fetchMoreData();
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

  themeControl = (bool) => {
    if (bool) {
      return 'light'
    } else {
      return 'dark'
    }
  };

  setDark = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' });
      
    } else {
      this.setState({ mode: 'light' });
      
    }
  };

  render() {
    console.log(this.state.isDark);
    let customTheme = createTheme({
      palette: {
        mode: this.state.mode,
        primary: {
          main: '#096c90',
          light: '#0066ff',
          dark: '#00000',
        },
        secondary: {
          main: '#04f4f5',
        },
      },
  });
  customTheme = responsiveFontSizes(customTheme);
    return (
      <ThemeProvider theme={customTheme}>
        <div> 
          <AppBar position="static">
            <Toolbar >
              <Typography align="center" variant="h6">demo: my-code-capabilities</Typography>
              <SearchBox arr={this.state.items}/>
              <FormGroup>
                <FormControlLabel control={<Switch onChange={this.setDark} />} label="Tema" labelPlacement="start" />
              </FormGroup>
            </Toolbar>
          </AppBar>
          <InfiniteScroll
          style={{backgroundColor: customTheme.palette.background.default}}
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <Grid container style={{padding: "10px"}} spacing={2} columns={{ xs: 1, sm: 8, md: 12, xl: 20 }}>
              {Array.from(Array(10)).map((_, index) => (
                <Grid item xs={1} sm={4} md={4} xl={4} key={index}>
                  <Card key={index} sx={{ minHeight: 500}}>
                    <Skeleton variant="rectangular" height={344}/>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        <Skeleton width={70} />
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        <Skeleton/>
                        <Skeleton/>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          }
          //height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! Você viu todos os items!</b>
            </p>
          }
          >
            <Grid container style={{padding: "10px"}} spacing={2} columns={{ xs: 1, sm: 8, md: 12, xl: 20 }}>
              {this.state.items.map((v, index) => (
                <Grid item xs={1} sm={4} md={4} xl={4} key={index}>
                  <Card sx={{ minHeight: 500}}>
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
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </div>
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));


/*                  
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, xl: 3 }}>
    <Grid item xs={1} xl={1} key={index}>
      <Item>xs=2</Item>
    </Grid>
</Grid>

*/