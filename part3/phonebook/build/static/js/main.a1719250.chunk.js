(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},19:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),o=n.n(l),u=(n(19),n(3)),c=n(2),m=n.n(c),i="http://localhost:3001/api/persons",s={getAll:function(){return m.a.get(i)},createPerson:function(e){m.a.post(i,e)},deletePerson:function(e){alert("Do you want to delete this person?"),m.a.delete("".concat(i,"/").concat(e))}},d=function(e){var t=e.person;return r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("button",{type:"button",onClick:s.deletePerson},"delete"))},f=function(e){var t=e.persons;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Agenda"),r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement(d,{key:e.name,person:e})})))))},E=function(e){var t=e.newName,n=e.newNumber,a=e.onNameChange,l=e.onNumberChange,o=e.addPerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Add a new contact:"),r.a.createElement("form",{onSubmit:o},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:n,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},b=function(e){var t=e.filter;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement("form",null,"Search contact:",r.a.createElement("input",{type:"text",style:{margin:"10px"},onChange:t})))},p=function(){var e=function(){s.getAll().then((function(e){return o(e.data)}))},t=Object(a.useState)([]),n=Object(u.a)(t,2),l=n[0],o=n[1],c=Object(a.useState)(""),m=Object(u.a)(c,2),i=m[0],d=m[1],p=Object(a.useState)(""),h=Object(u.a)(p,2),g=h[0],v=h[1];Object(a.useEffect)(e,[]);return r.a.createElement("div",null,r.a.createElement(b,{filter:function(e){if(e.target.value.length>0){var t=l.filter((function(t){return t.name.toLowerCase().indexOf(e.target.value.toLowerCase())>-1}));o(t)}}}),r.a.createElement(E,{newName:i,newNumber:g,onNameChange:function(e){d(e.target.value)},onNumberChange:function(e){v(e.target.value)},addPerson:function(t){t.preventDefault();var n={name:i,number:g};l.filter((function(e){return e.name===i})).length>0?alert("".concat(i," is already added to the phonebook.")):(s.createPerson(n),e())}}),r.a.createElement(f,{persons:l}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a1719250.chunk.js.map