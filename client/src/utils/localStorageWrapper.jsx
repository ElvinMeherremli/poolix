export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
  const event = new CustomEvent("storageChanged", { detail: { key, value } });
  window.dispatchEvent(event);
};

export const setSessionStorageItem = (key, value) => {
  sessionStorage.setItem(key, value);
  const event = new CustomEvent("storageChanged", { detail: { key, value } });
  window.dispatchEvent(event);
};
