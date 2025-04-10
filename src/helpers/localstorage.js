import { WORDS } from "../configs/constants";

export const pushArrayToLocalStorage = (arr = []) => {
  if (arr?.length > 0) {
    const wordsString = localStorage.getItem(WORDS);
    if (wordsString) {
      const wordArr = JSON.parse(wordsString);
      localStorage.setItem(WORDS, JSON.stringify([...wordArr,...arr]));
    } else {
      localStorage.setItem(WORDS, JSON.stringify(arr));
    }
  }
}