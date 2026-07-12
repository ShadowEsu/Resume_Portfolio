export function wrapLines(el: HTMLElement) {
  const text = el.textContent?.trim() ?? "";
  if (!text) return [];

  const words = text.split(/\s+/);
  el.innerHTML = "";
  el.setAttribute("aria-label", text);

  const lines: HTMLElement[] = [];
  const line = document.createElement("span");
  line.className = "line-mask";
  line.setAttribute("aria-hidden", "true");

  const inner = document.createElement("span");
  inner.className = "line-inner";
  inner.textContent = words.join(" ");
  line.appendChild(inner);
  el.appendChild(line);
  lines.push(inner);

  return lines;
}

export function wrapManualLines(el: HTMLElement) {
  const children = Array.from(el.children);
  if (children.length === 0) {
    return wrapLines(el);
  }

  const inners: HTMLElement[] = [];
  children.forEach((child) => {
    if (!(child instanceof HTMLElement)) return;
    const text = child.textContent?.trim() ?? "";
    child.classList.add("line-mask");
    child.setAttribute("aria-hidden", "true");
    child.innerHTML = "";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.textContent = text;
    child.appendChild(inner);
    inners.push(inner);
  });
  return inners;
}
