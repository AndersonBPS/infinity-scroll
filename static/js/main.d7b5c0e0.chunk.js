(this.webpackJsonpfirstreact=this.webpackJsonpfirstreact||[]).push([[0],{219:function(t,e,n){var c=n(292);t.exports=function(t,e,n){c("".concat("https://jsonplaceholder.typicode.com/photos","?albumId=").concat(t),(function(t,c,s){t?n(t):200===c.statusCode?e(JSON.parse(s)):n("".concat(c.statusCode,": ").concat(c.statusMessage))}))}},225:function(t,e,n){"use strict";n.r(e);var c=n(216),s=n(217),a=n(224),i=n(223),o=n(0),r=n.n(o),u=n(18),l=n(118),h=(n(289),n(290),n(291),n(218)),f=n(219),j=n.n(f),b=(n(517),n(20)),d=function(t){Object(a.a)(n,t);var e=Object(i.a)(n);function n(t){var s;return Object(c.a)(this,n),(s=e.call(this,t)).onSuccess=function(t){t.forEach((function(t){return{title:t.title,thumbnailUrl:t.thumbnailUrl}})),s.setState({items:s.state.items.concat(t)})},s.onFailure=function(t){console.error(t)},s.fetchMoreData=function(){s.state.items.length>=250?s.setState({hasMore:!1}):(j()(s.page,s.onSuccess,s.onFailure),s.page++)},s.setDark=function(){s.state.isDark?(s.setState({isDark:!1}),console.log(s.state.isDark)):(s.setState({isDark:!0}),console.log(s.state.isDark))},s.themeControl=function(t){},s.state={items:[],hasMore:!0,isDark:!1},s.page=1,s.fetchMoreData(),console.log(s.state.isDark),s}return Object(s.a)(n,[{key:"render",value:function(){var t={display:"block",marginLeft:"auto",marginRight:"auto",height:"auto"};return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{style:{color:"lawngreen"},children:"demo: react-infinite-scroll-component"}),Object(b.jsx)(l.a,{onClick:this.setDark}),Object(b.jsx)("hr",{}),Object(b.jsx)(h.a,{className:"infinite-scroll",dataLength:this.state.items.length,next:this.fetchMoreData,hasMore:this.state.hasMore,loader:Object(b.jsx)(l.c,{}),endMessage:Object(b.jsx)("p",{children:"Yay! You have seen it all"}),children:this.state.items.map((function(e,n){return Object(b.jsxs)(l.b,{className:"item-div",children:[Object(b.jsx)("div",{children:Object(b.jsx)("img",{style:t,src:e.thumbnailUrl})}),Object(b.jsx)("div",{children:Object(b.jsx)("h2",{children:e.title})})]},n)}))})]})}}]),n}(r.a.Component);Object(u.render)(Object(b.jsx)(d,{}),document.getElementById("root"))},309:function(t,e){},311:function(t,e){},321:function(t,e){},323:function(t,e){},348:function(t,e){},350:function(t,e){},351:function(t,e){},356:function(t,e){},358:function(t,e){},364:function(t,e){},366:function(t,e){},385:function(t,e){},397:function(t,e){},400:function(t,e){},426:function(t,e){},517:function(t,e,n){}},[[225,1,2]]]);
//# sourceMappingURL=main.d7b5c0e0.chunk.js.map