export function DrawText(textContent, x = 0, y = 0, color = "black", fontSize = 16, anchor = "start") {
  if (!textContent) return;

  // Create the SVG text element
  const textElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textElem.setAttribute("x", x);
  textElem.setAttribute("y", y);
  textElem.setAttribute("fill", color);
  textElem.setAttribute("font-size", fontSize);
  textElem.setAttribute("text-anchor", anchor); // start, middle, end
  textElem.style.pointerEvents = "stroke" 
  textElem.textContent = textContent;

  // Wrap in a <g> element if you want to transform it later
  const gText = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gText.appendChild(textElem);
  gText.style.transform = "translate(0px,0px)";

  // Append to the first <svg> on the page
  const svg = document.querySelector("svg");
  if (svg) {
   
    svg.appendChild(gText);
  } else {
    console.warn("No SVG found in the document");
  }
}