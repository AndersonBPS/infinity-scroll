import React, { Component } from 'react';
import {render} from 'react-dom';
import { Card, Spinner, Button} from "@blueprintjs/core";
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
      isDark: false,
    };
    this.page = 1;
    this.fetchMoreData();
    console.log(this.state.isDark);
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
    if (this.state.items.length >= 250) {
      this.setState({ hasMore: false });
      return;
    }

    getPage(this.page, this.onSuccess, this.onFailure);

    this.page++;
  };

  setDark = () => {
    if (this.state.isDark) {
      this.setState({ isDark: false });
      console.log(this.state.isDark);
    } else {
      this.setState({ isDark: true });
      console.log(this.state.isDark);
    }
  };

  themeControl = (bool) => {

  };

  render() {
    const imgStlye = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      height: "auto"
    };
    return (
      <div>
        <h1 style={{color: "lawngreen"}}>demo: react-infinite-scroll-component</h1>
        <Button onClick={this.setDark}></Button>
        <hr />
        <InfiniteScroll
          className="infinite-scroll"
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner/>}
          endMessage={
            <p>Yay! You have seen it all</p>  
          }
        >
          {this.state.items.map((v, index) => (
            <Card className="item-div" key={index}>
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