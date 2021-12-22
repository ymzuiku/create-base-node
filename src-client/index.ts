export function App() {
  const out = document.createElement("div");
  const ele = document.createElement("div");
  ele.textContent = "Hello full stack";
  out.append(ele);

  const img = document.createElement("img");
  img.width = 200;
  img.height = 200;
  img.src = "/logo.svg";
  out.append(img);

  setTimeout(() => {
    fetch("/ping")
      .then((v) => v.text())
      .then((v) => {
        const ele = document.createElement("div");
        ele.textContent = v;
        document.body.append(ele);
      });
  }, 30);

  return out;
}

document.body.append(App());
