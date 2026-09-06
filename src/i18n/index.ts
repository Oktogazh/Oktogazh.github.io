import en from '../locales/en.json';
import fr from '../locales/fr.json';
import br from '../locales/br.json';
import cy from '../locales/cy.json';

export const LOCALES = ['en', 'fr', 'br', 'cy'] as const;
export type Locale = (typeof LOCALES)[number];

/** English is the fallback, not the point. The notebook itself is mostly Breton. */
export const DEFAULT_LOCALE: Locale = 'en';

/** Locales other than the default get a path prefix; the default sits at the root. */
export const ALT_LOCALES = LOCALES.filter(
	(l) => l !== DEFAULT_LOCALE,
) as Exclude<Locale, 'en'>[];

export type Messages = typeof en;

export const ui: Record<Locale, Messages> = {
	en,
	fr: fr as Messages,
	br: br as Messages,
	cy: cy as Messages,
};

export function t(locale: Locale): Messages {
	return ui[locale] ?? ui[DEFAULT_LOCALE];
}

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Home page URL for a locale. `/` for English, `/fr` `/br` `/cy` for the rest. */
export function homeHref(locale: Locale): string {
	return locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
}

/**
 * BCP 47 tag for <html lang>. The notebook's own notes carry their own tag;
 * this is only for the interface.
 */
export function htmlLang(locale: Locale): string {
	return locale;
}

/** Endonyms, for the switcher. Always shown in their own language. */
export const ENDONYM: Record<Locale, string> = {
	en: 'English',
	fr: 'Français',
	br: 'Brezhoneg',
	cy: 'Cymraeg',
};

/**
 * Endonyms for the languages a *note* can be written in — a superset of the
 * interface locales, because the notebook holds notes in languages the site
 * chrome is not translated into. Used by the filter on /notes.
 */
export const NOTE_ENDONYM: Record<string, string> = {
	...ENDONYM,
	uk: 'Українська',
};

/** Roman numerals for the entry's senses. Four is as far as this ever needs to go. */
export const SENSE_NUMERALS = ['I', 'II', 'III', 'IV'] as const;
