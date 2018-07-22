/** @jsx didact.createElement */

const root = document.getElementById("root");
const element = (
  <div id="container">
    <input value="bazss" type="text" />
    <a href="/bar">bar</a>
    <span onClick={e => alert("Hi")}>click me</span>
  </div>
);
didact.render(element, root);