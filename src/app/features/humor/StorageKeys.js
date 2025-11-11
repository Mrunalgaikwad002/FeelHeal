export const STORAGE_FAV = "feelheal_joke_favorites";
export const STORAGE_REACTIONS = "feelheal_joke_reactions";
export const STORAGE_LAUGH_TODAY = "feelheal_joke_laughs_today";
export const STORAGE_LANG = "feelheal_joke_lang";
export const STORAGE_MODE = "feelheal_joke_mode";

export function safeGet(key, fallback) {
	try {
		const v = localStorage.getItem(key);
		return v == null ? fallback : v;
	} catch {
		return fallback;
	}
}

export function safeSet(key, value) {
	try {
		localStorage.setItem(key, value);
	} catch {}
}


