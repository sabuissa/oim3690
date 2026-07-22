// content.js
// Runs on every page (see manifest.json "matches"). Finds the article text,
// estimates how long it takes to read, and shows a banner at the top.

const BANNER_ID = "reading-time-banner";

// Settings the popup can change. These are the defaults used the very first
// time the extension runs, before anything has been saved.
const DEFAULT_SETTINGS = {
  enabled: true,
  wpm: 200, // words per minute, used to turn a word count into minutes
};

// Find the container most likely to hold the actual article text.
// Wikipedia is the test target, so its content div is checked first.
// The generic <article> tag and a plain fallback cover other sites.
function getArticleContainer() {
  return (
    document.querySelector("#mw-content-text") || // Wikipedia (current skin)
    document.querySelector("#bodyContent") || // Wikipedia (older skin)
    document.querySelector("article") || // any page using semantic HTML
    document.body // last resort: the whole page
  );
}

// Count words in only the text a reader would actually see.
// innerText (not textContent) is used on purpose: textContent would also
// pull in the hidden contents of <script> and <style> tags, and innerText
// naturally skips those plus anything hidden with CSS. Comment nodes are
// never included in either property, so they're excluded automatically.
function countWords(container) {
  const visibleText = container.innerText || "";
  const words = visibleText.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

// Turn a word count into a whole number of minutes, at least 1.
function estimateMinutes(wordCount, wpm) {
  return Math.max(1, Math.ceil(wordCount / wpm));
}

function buildBanner(minutes) {
  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.textContent = `📖 Estimated reading time: ${minutes} min`;
  return banner;
}

function removeBanner() {
  const existing = document.getElementById(BANNER_ID);
  if (existing) existing.remove();
}

// Build (or rebuild) the banner using the current settings.
function showBanner(settings) {
  removeBanner();

  if (!settings.enabled) return;

  const container = getArticleContainer();
  const wordCount = countWords(container);
  const minutes = estimateMinutes(wordCount, settings.wpm);
  const banner = buildBanner(minutes);

  // Inserted as the very first element of <body>, in normal document flow,
  // so it pushes the page down instead of floating on top and covering it.
  document.body.prepend(banner);
}

// Load saved settings (or the defaults, the first time) and show the banner.
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  showBanner(settings);
});

// If the popup changes a setting, update the banner immediately instead of
// waiting for a page refresh.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;

  chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
    showBanner(settings);
  });
});
