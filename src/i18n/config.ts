import pt from './pt.json';
import en from './en.json';
import es from './es.json';

export const languages = { pt: 'Português', en: 'English', es: 'Español' } as const;
export const defaultLang = 'pt';
export type Lang = keyof typeof languages;

const translations = { pt, en, es } as const;

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
  }
  return result ?? key;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}
