(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{57:function(e,t,a){e.exports=a(93)},92:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),c=a.n(o),s=a(17),l=a(18),i=a(23),m=a(19),u=a(24),p=(a(62),a(21)),d=a(13),f=a(22),E=a(12),h=a(47),y=a(15),b=a(9),O={array:null,arrays:null},v={msg:{},status:null,id:null},N={comment:null,filename:null,comments:null},g=Object(E.c)({photos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FIRST_PHOTOS":return Object(b.a)({},e,{arrays:Object(y.a)(t.payload).slice(0,2)});case"MORE_PHOTOS":return Object(b.a)({},e,{arrays:Object(y.a)(t.payload[0]).slice(0,t.payload[1].count)});case"ALL_PHOTOS":return Object(b.a)({},e,{arrays:t.payload});case"DELETE_PHOTO":return Object(b.a)({},e,{arrays:e.arrays.filter(function(e){return e.filename!==t.payload})});case"SELECTED_UPLOADER":return console.log(t.payload,"reducer"),Object(b.a)({},e,{arrays:[t.payload].concat(Object(y.a)(e.arrays))});case"SINGLE_VIEW":return Object(b.a)({},e,{array:Object(y.a)(t.payload[0]).find(function(e){return e.filename===t.payload[1].file})});default:return e}},error:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return{msg:t.payload.msg,status:t.payload.status,id:t.payload.id};case"CLEAR_ERRORS":return{msg:{},status:null,id:null};default:return e}},comments:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"COMMENT_UPLOADER":return Object(b.a)({},e,{comments:[t.payload].concat(Object(y.a)(e.comments))});case"INDIV_COMMENTS":case"DELETE_PHOTO_COMMENTS":return Object(b.a)({},e,{comments:t.payload});default:return e}}}),_=[h.a],j=Object(E.e)(g,{},Object(E.d)(E.a.apply(void 0,_),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),C=a(5),T=a(97),S=a(96),D=a(95),P=a(7),L=a.n(P),R=function(e,t){return{type:"GET_ERRORS",payload:{msg:e,status:t,id:arguments.length>2&&void 0!==arguments[2]?arguments[2]:null}}},w=a(48),k=a.n(w),M=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onClickDelete=function(e){a.props.deletePhoto(e),a.props.deletePhotoComments(e)},a.getNext=function(){a.setState({count:a.state.count+3}),a.props.morePhotos(a.state.count)},a.state={arrays:[],count:5,valid:!0},a.onFileChange=a.onFileChange.bind(Object(C.a)(a)),a.submit=a.submit.bind(Object(C.a)(a)),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.firstPhotos()}},{key:"onFileChange",value:function(e){e.target.files[0]?this.setState({valid:!0}):this.setState({valid:!1})}},{key:"submit",value:function(e){e.preventDefault();var t=this.refs.myFile.files[0];this.props.uploadHandlerer(t)}},{key:"render",value:function(){var e=this;if(this.props.arrays){var t=this.props.arrays;return r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 m-auto"},r.a.createElement("h1",{className:"text-center display-4 my-4"},"MERN, Redux ",r.a.createElement("br",null),"Photo Stream"),r.a.createElement("form",{action:"/api/items/upload",method:"POST",encType:"multipart/form-data"},r.a.createElement("div",{className:"custom-file mb-3"},r.a.createElement("input",{type:"file",ref:"myFile",onChange:this.onFileChange,name:"file",id:"file",className:"custom-file-input"}),r.a.createElement("label",{htmlFor:"file",className:"custom-file-label"},"Choose File")),r.a.createElement("input",{type:"submit",onClick:this.submit,value:"Submit",name:"file",className:"btn btn-primary btn-block"})),r.a.createElement("hr",null),r.a.createElement(k.a,{dataLength:this.props.arrays.length,next:this.getNext,hasMore:!0},t.map(function(t){var a=t._id,n=t.filename;return r.a.createElement(S.a,null,r.a.createElement(D.a,{key:a,timeout:233,classNames:"fade"},r.a.createElement("div",{className:"card card-body mb-3",key:a},r.a.createElement(p.b,{to:"/image/"+n},r.a.createElement("img",{src:"password/image/"+n,key:a,alt:"",className:"imaage"})),r.a.createElement("form",null,r.a.createElement(T.a,{className:"btn btn-danger btn-block mt-4",onClick:e.onClickDelete.bind(e,n)},"Delete")))))}))))))}return r.a.createElement("div",null,"...Loading")}}]),t}(r.a.Component),F=Object(f.b)(function(){return function(e){return{arrays:e.photos.arrays}}},{firstPhotos:function(){return function(e){L.a.get("/api/items").then(function(t){return e({type:"FIRST_PHOTOS",payload:t.data})}).catch(function(t){return e(R(t.response.data,t.response.status))})}},morePhotos:function(e){return function(t){L.a.get("/api/items").then(function(a){return t({type:"MORE_PHOTOS",payload:[a.data,{count:e}]})}).catch(function(e){return t(R(e.response.data,e.response.status))})}},deletePhoto:function(e){return function(t){L.a.delete("/api/items/".concat(e)).then(t({type:"DELETE_PHOTO",payload:e})).catch(function(e){return t(R(e.response.data,e.response.status))})}},uploadHandlerer:function(e){return function(t){var a=new FormData;a.append("file",e,e.name),L.a.post("/api/items/upload",a).then(function(e){return t({type:"SELECTED_UPLOADER",payload:e.data.file})}).catch(function(e){return t(R(e.response.data,e.response.status))})}},deletePhotoComments:function(e){return function(t){L.a.delete("/api/comments/comments/all/".concat(e)).then(t({type:"DELETE_PHOTO_COMMENTS",payload:e})).catch(function(e){return t(R(e.response.data,e.response.status))})}}})(M),H=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).submitFormHandler=function(e){e.preventDefault();var t=a.refs.aComment.value,n=a.props.match.params.filename;a.props.commentUploader(t,n),a.refs.aComment.value=""},a.submitFormHandler=a.submitFormHandler.bind(Object(C.a)(a)),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.singleView(this.props.match.params.filename),this.props.individualComments(this.props.match.params.filename),window.scrollTo(0,0)}},{key:"render",value:function(){var e=this.props.comments?r.a.createElement("div",null,r.a.createElement(p.b,{to:"/"},r.a.createElement("h4",{className:"home-text"},"home")),r.a.createElement("div",{className:"card card-body mb-3"},r.a.createElement("img",{src:"/api/items/image/".concat(this.props.array.filename),alt:"",className:"post-imaage"}),r.a.createElement("br",null),r.a.createElement("form",{className:"comment-submitter",name:"myComment",width:"40%",onSubmit:this.submitFormHandler},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"comment"},"Comment:"),r.a.createElement("textarea",{className:"form-control",rows:"5",id:"comment",type:"text",ref:"aComment"})),r.a.createElement(T.a,{className:"btn btn-block mt-4",type:"submit"},"Submit"))),r.a.createElement("div",{className:"container-home"},r.a.createElement("h4",{className:"another-comment"},"Comments"),this.props.comments.map(function(e){return r.a.createElement("div",{className:"post-card",key:e._id},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"card-title  red-text"},"Date:",e.date),r.a.createElement("p",{className:"comment-text-in"},"Comment: ",e.content)))}))):r.a.createElement("div",{className:"center"},"Loading...");return r.a.createElement("div",{className:"container"},e)}}]),t}(r.a.Component),I=Object(f.b)(function(e){return{array:e.photos.array,comments:e.comments.comments}},{allPhotos:function(){return function(e){L.a.get("/api/items").then(function(t){return e({type:"ALL_PHOTOS",payload:t.data})}).catch(function(t){return e(R(t.response.data,t.response.status))})}},singleView:function(e){return function(t){L.a.get("/api/items").then(function(a){return t({type:"SINGLE_VIEW",payload:[a.data,{file:e}]})})}},commentUploader:function(e,t){return function(a){L.a.post("/api/comments/comment/upload/",{content:e,page:t}).then(function(e){return a({type:"COMMENT_UPLOADER",payload:e.data})}).catch(function(e){return a(R(e.response.data,e.response.status))})}},individualComments:function(e){return function(t){L.a.get("/api/comments/comments/".concat(e)).then(function(e){return t({type:"INDIV_COMMENTS",payload:e.data})}).catch(function(e){return t(R(e.response.data,e.response.status))})}}})(H),x=(a(92),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(f.a,{store:j},r.a.createElement("div",{className:"App"},r.a.createElement(d.c,null,r.a.createElement(d.a,{exact:!0,path:"/",component:F}),r.a.createElement(d.a,{path:"/image/:filename",component:I})))))}}]),t}(r.a.Component));c.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.378e271a.chunk.js.map