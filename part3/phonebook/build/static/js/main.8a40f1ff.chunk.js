(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,t,n){e.exports=n(40)},22:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(15),o=n.n(l),c=(n(22),n(3)),u=n(16),m=function(e){var t=e.person,n=e.deletePerson;return r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("button",{type:"button",onClick:function(){return n(t.id)}}," delete"))},i=function(e){var t=e.filter,n=e.persons,a=e.deletePerson,l=n.filter((function(e){return e.name.toLowerCase().indexOf(t.toLowerCase())>-1}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Agenda"),r.a.createElement("table",null,r.a.createElement("tbody",null,l.map((function(e){return r.a.createElement(m,{key:e._id,person:e,deletePerson:a})})))))},s=function(e){var t=e.newName,n=e.newNumber,a=e.onNameChange,l=e.onNumberChange,o=e.addPerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Add a new contact:"),r.a.createElement("form",{onSubmit:o},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:n,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var t=e.filter,n=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement("form",null,"Search contact:",r.a.createElement("input",{type:"text",style:{margin:"10px"},value:t,onChange:n})))},f=n(5),b=n.n(f),p="http://localhost:3001",E=function(){return b.a.get("".concat(p,"/api/persons"))},h=function(e){return b.a.post("".concat(p,"/api/persons"),e)},g=function(e){return b.a.delete("".concat(p,"/api/persons/").concat(e))},v=function(){var e=function(){E().then((function(e){var t=Object(u.a)(e.data);console.log(l),console.log(t),o(t)}))},t=Object(a.useState)([]),n=Object(c.a)(t,2),l=n[0],o=n[1],m=Object(a.useState)(""),f=Object(c.a)(m,2),b=f[0],p=f[1],v=Object(a.useState)(""),C=Object(c.a)(v,2),O=C[0],j=C[1],w=Object(a.useState)(""),k=Object(c.a)(w,2),y=k[0],N=k[1];Object(a.useEffect)(e,[]);return r.a.createElement("div",null,r.a.createElement(d,{filter:y,handleFilterChange:function(e){N(e.target.value)}}),r.a.createElement(s,{newName:b,newNumber:O,onNameChange:function(e){p(e.target.value)},onNumberChange:function(e){j(e.target.value)},addPerson:function(t){t.preventDefault();var n={name:b,number:O};l.filter((function(e){return e.name===b})).length>0?alert("".concat(b," is already added to the phonebook.")):h(n).then((function(t){p(""),j(""),e()}))}}),r.a.createElement(i,{filter:y,persons:l,deletePerson:function(t){g(t),e()}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.8a40f1ff.chunk.js.map