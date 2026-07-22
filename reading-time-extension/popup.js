// popup.js
// Reads and writes the same settings object that content.js listens to.

const DEFAULT_SETTINGS = {
  enabled: true,
  wpm: 200,
};

const enabledInput = document.getElementById("enabled");
const wpmInput = document.getElementById("wpm");
const statusEl = document.getElementById("status");

// Fill the form with whatever is currently saved (or the defaults).
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  enabledInput.checked = settings.enabled;
  wpmInput.value = settings.wpm;
});

// Show a brief "Saved" message so the click/edit feels confirmed.
function flashSaved() {
  statusEl.textContent = "Saved";
  setTimeout(() => {
    statusEl.textContent = "";
  }, 1000);
}

enabledInput.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: enabledInput.checked }, flashSaved);
});

wpmInput.addEventListener("change", () => {
  // Guard against empty or out-of-range input before saving.
  let wpm = parseInt(wpmInput.value, 10);
  if (isNaN(wpm) || wpm < 100) wpm = DEFAULT_SETTINGS.wpm;
  wpmInput.value = wpm;

  chrome.storage.sync.set({ wpm }, flashSaved);
});
