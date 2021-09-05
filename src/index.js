import React, { Component } from 'react';
import {render} from 'react-dom';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import getPage from './page-request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMore: true
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
    if (this.state.items.length >= 250) {
      this.setState({ hasMore: false });
      return;
    }

    getPage(this.page, this.onSuccess, this.onFailure);

    this.page++;
  };

  render() {
    const style = {
      flex: "10%",
      border: "1px solid green",
      margin: 6,
      padding: 8
    };
    const imgStlye = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
      height: "auto"
    };
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          style={{display: "flex", flexWrap: "wrap"}}
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <div style={{ display: "block", textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
        >
          {this.state.items.map((v, index) => (
            <div style={style} key={index}>
              <img style={imgStlye} src={v.thumbnailUrl}/>
              <h2>{v.title}</h2>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
