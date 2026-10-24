const KEY = "shiosai:uv";
const listeners = new Set<() => void>();

export const uvBootScript = `try{if(sessionStorage.getItem("${KEY}")==="1")document.documentElement.dataset.uv=""}catch(e){}document.documentElement.dataset.js=""`;

export function subscribeUv(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getUv() {
  return document.documentElement.hasAttribute("data-uv");
}

export function getServerUv() {
  return false;
}

export function setUv(on: boolean) {
  const root = document.documentElement;
  if (on) root.dataset.uv = "";
  else delete root.dataset.uv;
  try {
    sessionStorage.setItem(KEY, on ? "1" : "0");
  } catch {}
  for (const listener of listeners) listener();
}
