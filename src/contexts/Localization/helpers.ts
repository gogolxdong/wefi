import { EN } from './../../config/localization/languages'

const publicUrl = process.env.PUBLIC_URL || ''

export const LS_KEY = 'language'

export const fetchLocale = async (locale) => {
  const url = publicUrl + '/locales/' + locale + '.json'
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
