import React, { Component } from 'react';
import {render} from 'react-dom';
import { Card, Spinner, Switch, Elevation, Navbar, NavbarHeading, NavbarGroup, Alignment} from "@blueprintjs/core";
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import getPage from './page-request';
import './index.css';

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
    const imgStlye = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      height: "auto"
    };
    return (
      <div>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <h1 style={{color: "lawngreen"}}>demo: my-code-capabilities</h1>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <h3 style={{height: "25px"}}>Tema Escuro</h3>
            <Switch onChange={this.setDark}/>
          </NavbarGroup>
        </Navbar>
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
            <Card className="item-div-dark" key={index} elevation={Elevation.THREE}>
              <div>
                <img style={imgStlye} src={v.thumbnailUrl}/>
              </div>
              <div>
                <h2>{v.title}</h2>
              </div>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));