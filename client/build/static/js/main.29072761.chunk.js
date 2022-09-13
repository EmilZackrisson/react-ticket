(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{175:function(e,a,t){e.exports=t(316)},181:function(e,a,t){},19:function(e){e.exports={SERVER_URL:"https://ticket-api.emilzackrisson.se"}},222:function(e,a){},224:function(e,a){},234:function(e,a){},236:function(e,a){},261:function(e,a){},263:function(e,a){},264:function(e,a){},269:function(e,a){},271:function(e,a){},277:function(e,a){},279:function(e,a){},298:function(e,a){},310:function(e,a){},313:function(e,a){},316:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(171),o=t.n(r),c=t(2),i=t(6),s=(t(181),t(18)),m=t.n(s),u=t(323),d=t(318),g=t(325),p=t(324),E=t(319),b=t(320),f=t(321),v=t(77),h=t(327),y=t(326),k=t(322),S=t(4),O=t.n(S),j=t(19);var L=function(){var e=localStorage.getItem("user");if(e){var a=JSON.parse(e);console.log("local storage: ",a),m.a.post(j.SERVER_URL+"/api/userActive",{email:a.email}).then(function(){console.log("user active updated")}).catch(function(e){console.log("det gick inte att skicka"),console.log(e.message),"Request failed with status code 406"===e.message&&alert("Error 406. Testa att skicka igen.")})}},w=t(172),N=t.n(w);t(82);var R=function(){localStorage.getItem("serverUrl");var e=Object(n.useState)([]),a=Object(i.a)(e,2),t=a[0],r=a[1],o=Object(n.useState)(""),s=Object(i.a)(o,2),S=s[0],w=s[1],R=Object(n.useState)(""),x=Object(i.a)(R,2),C=x[0],D=x[1],V=Object(n.useState)(Boolean),T=Object(i.a)(V,2),I=T[0],P=T[1],G=Object(n.useState)(""),U=Object(i.a)(G,2),A=U[0],F=U[1],_=Object(n.useState)(""),B=Object(i.a)(_,2),q=B[0],H=B[1],J=Object(n.useState)(""),z=Object(i.a)(J,2),K=z[0],M=z[1],Y=Object(n.useState)(""),Z=Object(i.a)(Y,2),Q=Z[0],W=Z[1],X=Object(n.useState)({name:"",email:"",issue:"",category:"",priority:""}),$=Object(i.a)(X,2),ee=$[0],ae=$[1],te=[{text:"Inte Specificerad",value:0},{text:"L\xe5g",value:1},{text:"Medel",value:2},{text:"H\xf6g",value:3}],ne=!0,le=["Klicka f\xf6r att v\xe4lja kategori","React Ticket","Home Assistant","zServer","Docker","Berit","Alice Home Assistant","Alice L\xe4genhet","\xd6vrigt"].map(function(e){return l.a.createElement("option",{key:e,value:e},e)}),re=te.map(function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.text)});Object(n.useEffect)(function(){var e=localStorage.getItem("user"),a=localStorage.getItem("changedIssue"),t=JSON.parse(a);if(e){var n=JSON.parse(e);console.log("local storage: ",n),w(n.name),D(n.email),P(!0),L(),F("/logout"),H("Logga ut"),W("Hej "+n.name+"!"),M("Inloggad som ",n.name),ae(Object(c.a)({},ee,{name:n.name,email:n.email})),console.log("Username:",n.name),console.log("email: ",n.email)}e||(F("/login"),H("Logga in"),W("Hej V\xe4rlden!")),t&&localStorage.removeItem("changedIssue"),m.a.get(j.SERVER_URL+"/api/get").then(function(e){r(e.data)}).catch(function(e){console.log(e)})},[]);var oe=function(){console.log("updating list"),m.a.get(j.SERVER_URL+"/api/get").then(function(e){ne&&console.log(e.data),r(e.data),window.location.reload(!1)})},ce=Object(n.useState)(!1),ie=Object(i.a)(ce,2),se=ie[0],me=ie[1],ue=Object(n.useState)({issue:"",id:"",category:""}),de=Object(i.a)(ue,2),ge=de[0],pe=de[1],Ee=function(e){var a=e.currentTarget;e.preventDefault(),!1===a.checkValidity()&&(console.log(ee),e.preventDefault(),e.stopPropagation()),me(!0),I?(console.log("update sent"),m.a.patch(j.SERVER_URL+"/api/patch/issue",{issue:ge.issue,id:ge.id,category:ge.category,updater:S}).then(function(){oe(),localStorage.setItem("changedIssue",JSON.stringify({id:ge.id}))})):alert("Du m\xe5ste vara inloggad f\xf6r att uppdatera")},be=function(){I?(console.log("f\xf6rs\xf6ker skicka"),m.a.post(j.SERVER_URL+"/api/createIssue",{senderName:ee.name,issue:ee.issue,senderEmail:ee.email,complete:0,category:ee.category,priority:ee.priority}).then(function(){console.log("successfully sended issue to server"),window.location.reload(!1)}).catch(function(e){console.log("det gick inte att skicka"),console.log(e.message),"Request failed with status code 406"===e.message&&alert("Error 406. Testa att skicka igen.")})):alert("Du m\xe5ste vara inloggad f\xf6r att uppdatera")};return l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"light",expand:"lg"},l.a.createElement(d.a,{fluid:!0},l.a.createElement(u.a.Brand,{href:"/"},"React Ticket"),l.a.createElement(u.a.Toggle,{"aria-controls":"navbarScroll"}),l.a.createElement(u.a.Collapse,{id:"navbarScroll"},l.a.createElement(g.a,{className:"me-auto my-2 my-lg-0",style:{maxHeight:"100px"},navbarScroll:!0},l.a.createElement(g.a.Link,{href:"/"},"Hem"),l.a.createElement(g.a.Link,{href:"/settings"},"Inst\xe4llningar")),l.a.createElement(p.a,{className:"d-flex"},l.a.createElement(u.a.Text,{className:"mx-2"},K," ",S),l.a.createElement(E.a,{variant:"primary",href:A},q))))),l.a.createElement(b.a,{key:"warning",variant:"warning",className:"m-1"},"Denna applikation \xe4r fortfarande inte f\xe4rdig, s\xe5 den kanske inte fungerar fullt som den ska."),l.a.createElement("div",{className:"jumbotron m-3"},l.a.createElement("h1",{className:"display-4"},Q),l.a.createElement("p",{className:"lead"},"Det h\xe4r \xe4r ett egenbyggt ticket system av Emil Zackrisson"),l.a.createElement("hr",{className:"my-4"})),l.a.createElement(p.a,{noValidate:!0,validated:se,onSubmit:function(e){var a=e.currentTarget;e.preventDefault(),!1===a.checkValidity()&&(console.log(ee),e.preventDefault(),e.stopPropagation()),me(!0),be()},className:"container-xl mb-5 border p-3 rounded"},l.a.createElement(f.a,{className:"mb-3"},l.a.createElement(v.a,{md:"4",controlId:"validationCustom01"},l.a.createElement(p.a.Label,null,"Namn"),l.a.createElement(p.a.Control,{required:!0,type:"text",placeholder:"Namn",value:S,readOnly:I,onChange:function(e){return ae(Object(c.a)({},ee,{name:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,null,"Ser bra ut!"),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange ditt namn.")),l.a.createElement(p.a.Group,{md:"4",controlId:"validationCustomUsername"},l.a.createElement(p.a.Label,null,"E-post"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(h.a.Text,{id:"inputGroupPrepend"},"@"),l.a.createElement(p.a.Control,{type:"email",placeholder:"E-post","aria-describedby":"inputGroupPrepend",value:C,readOnly:I,required:!0,onChange:function(e){return ae(Object(c.a)({},ee,{email:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange din E-post.")))),l.a.createElement(f.a,{className:"mb-3"},l.a.createElement(p.a.Group,{md:"6",controlId:"validationCustom03"},l.a.createElement(p.a.Label,null,"Problem"),l.a.createElement(p.a.Control,{as:"textarea",placeholder:"Jag har problem med...",required:!0,onChange:function(e){return ae(Object(c.a)({},ee,{issue:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Vad \xe4r ditt problem?")),l.a.createElement(p.a.Group,null,l.a.createElement(p.a.Label,null,"Kategori"),l.a.createElement(p.a.Select,{"aria-label":"Kategori",onChange:function(e){return ae(Object(c.a)({},ee,{category:e.target.value}))}},le)),l.a.createElement(p.a.Group,null,l.a.createElement(p.a.Label,null,"Prioritet"),l.a.createElement(p.a.Select,{"aria-label":"Prioritet",onChange:function(e){return ae(Object(c.a)({},ee,{priority:e.target.value}))}},re))),l.a.createElement(E.a,{type:"submit"},"Skicka")),t.map(function(e){var a=O()({"border-success":Boolean(e.complete),"border-warning":!Boolean(e.complete)},"mb-3","container-xl"),t=new Date(e.timestamp).toLocaleString("sv-SE");if(""!=e.priority)var n="Prioritet: "+te[e.priority].text,r=O()({secondary:"0"===e.priority,info:"1"===e.priority,warning:"2"===e.priority,danger:"3"===e.priority},"mx-1");try{var o=JSON.parse(e.issue),i=o.length;if(console.log(o),i>1)var s="| Uppdaterades den "+new Date(o[i-1].timestamp).toLocaleString("sv-SE"),u=o[i-1].issue,d=o[i-1].updater;else u=o.issue}catch(g){u=e.issue}return l.a.createElement("div",{id:e.id,key:e.id},l.a.createElement(y.a,{className:a},l.a.createElement(y.a.Body,null,l.a.createElement(y.a.Title,null,"#",e.id," | ",e.senderName," ",l.a.createElement("a",{href:"mailto:"+e.senderEmail},e.senderEmail)," |"," ",e.category," | ",t,l.a.createElement(k.a,{bg:r},n)),l.a.createElement(y.a.Text,null,l.a.createElement(N.a,null,u)),l.a.createElement(p.a,{onSubmit:Ee},l.a.createElement(v.a,{controlId:"validationUpdate"},l.a.createElement(p.a.Label,null,"Uppdatera problem ",s," av ",d),l.a.createElement(p.a.Control,{type:"text",placeholder:"Problem",onChange:function(a){return pe(Object(c.a)({},ge,{issue:a.target.value,id:e.id}))},defaultValue:u}),l.a.createElement(p.a.Check,{type:"checkbox",label:"Markera som klar",checked:e.complete,onChange:function(a){return t=e.id,n=a.target.checked,ne&&console.log(t,n),void(I?m.a.post(j.SERVER_URL+"/api/patch/complete",{complete:Number(n),id:t}).then(function(){oe(),ne&&console.log("update complete ran")}):alert("Du m\xe5ste vara inloggad f\xf6r att uppdatera"));var t,n}})),l.a.createElement(p.a.Group,null,l.a.createElement(p.a.Label,null,"Kategori"),l.a.createElement(p.a.Select,{"aria-label":"Kategori",onChange:function(a){return t=e.id,n=a.target.value,console.log(t,n),void(I?m.a.patch(j.SERVER_URL+"/api/patch/category",{category:String(n),id:t}).then(function(){oe(),ne&&console.log("update category ran")}):alert("Du m\xe5ste vara inloggad f\xf6r att uppdatera"));var t,n},defaultValue:e.category},le)),l.a.createElement(p.a.Group,null,l.a.createElement(p.a.Label,null,"Prioritet"),l.a.createElement(p.a.Select,{"aria-label":"Prioritet",onChange:function(a){return t=e.id,n=a.target.value,console.log(t,n),void m.a.patch(j.SERVER_URL+"/api/patch/priority",{priority:n,id:t}).then(function(){oe(),ne&&console.log("update priority ran")});var t,n},defaultValue:e.priority},re)),l.a.createElement(E.a,{type:"submit"},"Uppdatera"),l.a.createElement(E.a,{type:"button",className:"btn-danger m-2",onClick:function(a){return t=e.id,console.log(t),void(I?m.a.post(j.SERVER_URL+"/api/delete/issue",{id:t}).then(function(){oe()}):alert("Du m\xe5ste vara inloggad f\xf6r att uppdatera"));var t}},"Ta bort")))))}))},x=t(63),C=t.n(x);var D=function(){var e=Object(n.useState)({name:"",email:"",password:"",permissionLevel:""}),a=Object(i.a)(e,2),t=a[0],r=a[1],o=Object(n.useState)(!1),s=Object(i.a)(o,2),v=s[0],k=s[1],S=Object(n.useState)(Boolean),O=Object(i.a)(S,2),w=O[0],N=O[1],R=Object(n.useState)(""),x=Object(i.a)(R,2),D=x[0],V=x[1],T=Object(n.useState)([]),I=Object(i.a)(T,2),P=I[0],G=I[1];return Object(n.useEffect)(function(){var e=localStorage.getItem("user");if(e){var a=JSON.parse(e);console.log("local storage: ",a),N(!0),V(a.permissionlevel),m.a.get(j.SERVER_URL+"/api/listUsers").then(function(e){var a=e.data;delete e.data[0].hash,console.log(a),G(a)}),L()}e||(alert("Du \xe4r inte inloggad."),window.location.replace("/login"))},[]),!0===w&&"3"===D?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{bg:"light",variant:"light"},l.a.createElement(d.a,{fluid:!0},l.a.createElement(u.a.Brand,{href:"#home"},"React Ticket"),l.a.createElement(g.a,{className:"me-auto"},l.a.createElement(g.a.Link,{href:"/"},"Hem"),l.a.createElement(g.a.Link,{href:"/settings"},"Inst\xe4llningar")))),l.a.createElement(b.a,{key:"warning",variant:"warning",className:"m-1"},"Denna applikation \xe4r fortfarande inte f\xe4rdig, s\xe5 den kanske inte fungerar fullt som den ska."),l.a.createElement("div",{className:"jumbotron m-3"},l.a.createElement("h1",{className:"display-4"},"Inst\xe4llningar"),l.a.createElement("hr",{className:"my-4"})),l.a.createElement("section",{className:"container border p-3 rounded"},l.a.createElement("h4",{className:"display-6 m-3 "},"Anv\xe4ndare"),l.a.createElement("section",{className:"container border p-3 rounded"},l.a.createElement("h4",{className:"display-6 m-3 "},"L\xe4gg till Anv\xe4ndare"),l.a.createElement(p.a,{noValidate:!0,validated:v,onSubmit:function(e){var a=e.currentTarget;e.preventDefault(),console.log("Login submitted"),!1===a.checkValidity()&&(console.log(t),e.stopPropagation()),k(!0),C.a.genSalt(10,function(e,a){C.a.hash(t.password,a,function(e,a){console.log("email: ",t.email," hash: ",a),console.log("f\xf6rs\xf6ker skicka"),console.log("permission send",t.permissionLevel),m.a.post(j.SERVER_URL+"/api/user/add",{name:t.name,email:t.email,hash:a,permissionLevel:t.permissionLevel}).then(function(){console.log("new user added"),window.location.reload(!1)}).catch(function(e){console.log("det gick inte att skicka"),console.log(e.message),"Request failed with status code 406"===e.message&&alert("Error 406. Testa att skicka igen.")})})})},className:"container-xl m-3"},l.a.createElement(p.a.Group,{md:"4",controlId:"validationName"},l.a.createElement(p.a.Label,null,"F\xf6r och efternamn"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(h.a.Text,{id:"inputGroupPrepend"},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-person",viewBox:"0 0 16 16"},l.a.createElement("path",{d:"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"}))),l.a.createElement(p.a.Control,{type:"text",placeholder:"Ex. Anders Andersson","aria-describedby":"inputGroupPrepend",required:!0,onChange:function(e){return r(Object(c.a)({},t,{name:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange ditt l\xf6senord."))),l.a.createElement(f.a,{className:"mb-3"},l.a.createElement(p.a.Group,{md:"4",controlId:"validationEmail"},l.a.createElement(p.a.Label,null,"E-post"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(h.a.Text,{id:"inputGroupPrepend"},"@"),l.a.createElement(p.a.Control,{type:"email",placeholder:"Ex. anders.andersson@gmail.com","aria-describedby":"inputGroupPrepend",required:!0,onChange:function(e){return r(Object(c.a)({},t,{email:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange din E-post."))),l.a.createElement(p.a.Group,{md:"4",controlId:"validationPassword"},l.a.createElement(p.a.Label,null,"L\xf6senord"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(h.a.Text,{id:"inputGroupPrepend"},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-key",viewBox:"0 0 16 16"},l.a.createElement("path",{d:"M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"}),l.a.createElement("path",{d:"M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"}))),l.a.createElement(p.a.Control,{type:"password",placeholder:"L\xf6senord","aria-describedby":"inputGroupPrepend",required:!0,onChange:function(e){return r(Object(c.a)({},t,{password:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange ditt l\xf6senord."))),l.a.createElement(p.a.Group,null,l.a.createElement(p.a.Label,null,"Tillst\xe5nd"),l.a.createElement(p.a.Select,{"aria-label":"Tillst\xe5nd",onChange:function(e){return r(Object(c.a)({},t,{permissionLevel:e.target.value}))}},l.a.createElement("option",null,"\xd6ppna menyn f\xf6r att v\xe4lja"),l.a.createElement("option",{value:"1"},"1 - Anv\xe4ndare"),l.a.createElement("option",{value:"3"},"3 - Admin")))),l.a.createElement(E.a,{type:"submit"},"L\xe4gg till anv\xe4ndare"))),l.a.createElement("section",{className:"userList container border p-3 rounded my-3"},l.a.createElement("h4",{className:"display-6 m-3 "},"Alla anv\xe4ndare"),P.map(function(e){e.permissionlevel,e.permissionlevel;var a=new Date(e.timeCreated).toLocaleString("sv-SE"),t=new Date(e.lastLogin).toLocaleString("sv-SE"),n=new Date(e.lastActive).toLocaleString("sv-SE");return console.log(P),l.a.createElement(y.a,{className:"my-3"},l.a.createElement(y.a.Body,null,l.a.createElement(y.a.Title,null,e.name),l.a.createElement(y.a.Text,null,"E-post: ",e.email),l.a.createElement(y.a.Text,null,"Permission Level: ",e.permissionlevel),l.a.createElement(y.a.Text,null,"Konto skapat: ",a),l.a.createElement(y.a.Text,null,"Senaste inloggningen: ",t),l.a.createElement(y.a.Text,null,"Senast aktiv: ",n)))})))):"3"!==D?(console.log(D),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Error - Not Allowed"),l.a.createElement("p",null,"You have not the permission to access the settings."))):void 0};var V=function(){var e=Object(n.useState)(""),a=Object(i.a)(e,2),t=a[0],r=(a[1],Object(n.useState)("")),o=Object(i.a)(r,2),s=o[0],g=o[1],v=Object(n.useState)(""),y=Object(i.a)(v,2),k=y[0],S=y[1],O=Object(n.useState)(""),L=Object(i.a)(O,2),w=L[0],N=(L[1],Object(n.useState)("")),R=Object(i.a)(N,2),x=(R[0],R[1]),D=Object(n.useState)(!1),V=Object(i.a)(D,2),T=(V[0],V[1],Object(n.useState)(!1)),I=Object(i.a)(T,2),P=I[0],G=I[1],U=Object(n.useState)({email:"",password:""}),A=Object(i.a)(U,2),F=A[0],_=A[1];function B(){var e=F.email,a=F.password;""!==e|""!==a?m.a.post(j.SERVER_URL+"/api/user",{email:e}).then(function(e){if(console.log(e.data),console.log(typeof e.data),0===e.data.length&&alert("Fel inloggningsuppgifter."),0!==e.data.length){var t=e.data[0].hash;C.a.compare(a,t).then(function(a){console.log("password ",a),!0===a?(delete e.data[0].hash,localStorage.setItem("user",JSON.stringify(e.data[0])),m.a.post(j.SERVER_URL+"/api/userLoggedIn",{email:e.data[0].email}).then(function(e){console.log("inserted time")}),alert("Du kommer nu att skickas till startsidan."),window.location.replace("/")):alert("Fel inloggningsuppgifter.")})}}):alert("Du m\xe5ste skiva in b\xe5de e-post och l\xf6senord")}return Object(n.useEffect)(function(){var e=localStorage.getItem("user");e&&(alert("Du \xe4r redan inloggad. Du kommer att skickas till startsidan."),window.location.replace("/")),e||(g("/login"),S("Logga in"),x("Hej V\xe4rlden!"))}),l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{key:"warning",variant:"warning",className:"m-1"},"Denna applikation \xe4r fortfarande inte f\xe4rdig, s\xe5 den kanske inte fungerar fullt som den ska."),l.a.createElement(u.a,{className:"container-fluid text-bg-dark p-3"},l.a.createElement(d.a,{className:"container-fluid"},l.a.createElement(u.a.Brand,{href:"/"},"React Ticket"),l.a.createElement(u.a.Toggle,null),l.a.createElement(u.a.Collapse,{className:"justify-content-end"},l.a.createElement(u.a.Text,{className:"m-2"},w," ",t),l.a.createElement(E.a,{variant:"primary",href:s},k)))),l.a.createElement(p.a,{noValidate:!0,validated:P,onSubmit:function(e){var a=e.currentTarget;console.log("Login submitted"),!1===a.checkValidity()&&(console.log(F),e.preventDefault(),e.stopPropagation()),G(!0),B()},className:"container-xl mb-5 border p-3 rounded"},l.a.createElement(f.a,{className:"mb-3"},l.a.createElement(p.a.Group,{md:"4",controlId:"validationEmail"},l.a.createElement(p.a.Label,null,"E-post"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(h.a.Text,{id:"inputGroupPrepend"},"@"),l.a.createElement(p.a.Control,{type:"email",placeholder:"E-post","aria-describedby":"inputGroupPrepend",required:!0,onChange:function(e){return _(Object(c.a)({},F,{email:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange din E-post."))),l.a.createElement(p.a.Group,{md:"4",controlId:"validationPassword"},l.a.createElement(p.a.Label,null,"L\xf6senord"),l.a.createElement(h.a,{hasValidation:!0},l.a.createElement(p.a.Control,{type:"password",placeholder:"L\xf6senord","aria-describedby":"inputGroupPrepend",required:!0,onChange:function(e){return _(Object(c.a)({},F,{password:e.target.value}))}}),l.a.createElement(p.a.Control.Feedback,{type:"invalid"},"Du m\xe5ste ange ditt l\xf6senord.")))),l.a.createElement(E.a,{type:"button",onClick:B},"Logga In")))};var T=function(){return Object(n.useEffect)(function(){localStorage.clear()},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Du \xe4r nu utloggad!"))},I=t(173),P=t(8);o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.Fragment,null,l.a.createElement(I.a,null,l.a.createElement(P.c,null,l.a.createElement(P.a,{exact:!0,path:"/",element:l.a.createElement(R,null)}),l.a.createElement(P.a,{exact:!0,path:"/settings",element:l.a.createElement(D,null)}),l.a.createElement(P.a,{exact:!0,path:"/login",element:l.a.createElement(V,null)}),l.a.createElement(P.a,{exact:!0,path:"/logout",element:l.a.createElement(T,null)})))))}},[[175,1,2]]]);
//# sourceMappingURL=main.29072761.chunk.js.map