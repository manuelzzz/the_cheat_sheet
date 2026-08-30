/**
 * Supported locales, matching the top-level folders under `content/`.
 *
 * Adding content for a new locale folder is sufficient to make it
 * routable; this list is only used for UI concerns such as the default
 * redirect and locale switcher.
 */
export const locales = ['en', 'pt-br'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
