/** @jsx didact.createElement */
const render = didact.render;

const rootDom = document.getElementById("root");

function tick() {
  const time = new Date().toLocaleTimeString();
  const clockElement = <h1 id={time}>{time}</h1>;
  render(clockElement, rootDom);
}

tick();
setInterval(tick, 1000);