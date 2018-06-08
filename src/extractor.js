const maker = () => {
  // let attr = [...rows].map(
  //   x => x.querySelector("td:first-child code").textContent
  // );
  // let propContainers = [...rows].map(x => x.querySelector("td:nth-child(2)"));
  let table = document.querySelector(".standard-table tbody");
  let rows = table.querySelectorAll("tr");

  [...rows].forEach(el => {
    let at = el.querySelector("td:first-child code").textContent;
    let td = el.querySelector("td:nth-child(2)");
    let props = td.querySelectorAll("code").length
      ? td.querySelectorAll("code")
      : "global";
    let propArr =
      props.length && props !== "global"
        ? [...props].map(p => p.textContent)
        : "";
    console.log(propArr);
    let cleanProps = propArr.map(x => x.replace(/<|>/g, "")).join(",");
    console.log(cleanProps);
  });
};
