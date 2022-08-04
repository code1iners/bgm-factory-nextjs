/**
 * Open youtube on browser.
 * @param {string} category If need category
 */
export const openYoutube = (category?: string | string[] | undefined) => {
  let bgm = `${category ? `${category}` : ""}+bgm`;
  const endpoint = `/results?search_query=${bgm.trim()}`;
  const newWindow = window.open(
    `https://www.youtube.com${endpoint}`,
    "_blank",
    "noopener,noreferrer"
  );
  if (newWindow) newWindow.opener = null;
};
