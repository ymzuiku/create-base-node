export function App() {
  const out = document.createElement("div");
  const ele = document.createElement("div");
  ele.textContent = "dog";
  out.append(ele);

  const img = document.createElement("img");
  img.width = 200;
  img.height = 200;
  img.src = "/favicon.svg";
  out.append(img);
  out.onclick = function () {
    fetch("/ping")
      .then((v) => v.text())
      .then((v) => {
        const ele = document.createElement("div");
        ele.textContent = v;
        document.body.append(ele);
      });
  };
  return out;
}

document.body.append(App());
