import { createContext, useCallback, useEffect, useState } from 'react'
import { Language } from '@pancakeswap/uikit'
import { EN, languages } from './../../config/localization/languages'
import translations from './../../config/localization/translations.json'
import { ContextApi, ProviderState, TranslateFunction } from './types'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from './helpers'

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
}

export const languageMap = new Map<Language['locale'], Record<string, string>>()
languageMap.set(EN.locale, translations)

export const LanguageContext = createContext<any>(undefined)
// export const LanguageContext = createContext<ContextApi>(undefined!)

export const LanguageProvider: React.FC<any> = ({ children }) => {
  const [state, setState] = useState<ProviderState>(() => {
    const codeFromStorage = getLanguageCodeFromLS()
    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage],
    }
  })
  const { currentLanguage } = state
  useEffect( 
    ()=>{
        const init = async () => {
        const codeFromStorage = getLanguageCodeFromLS()
        const enLocale = languageMap.get(EN.locale)
        const currentLocale = await fetchLocale(codeFromStorage)
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale })
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }))
      }
      console.log('执行了useEffect')
      init()
    },[]
  )


  useEffect(() => {
    const fetchInitialLocales = async () => {
      const codeFromStorage = getLanguageCodeFromLS()
      console.log('codeFromStorage',codeFromStorage)
      console.log('En:',EN.locale)


      if (codeFromStorage !== EN.locale) {
        const enLocale = languageMap.get(EN.locale)
        const currentLocale = await fetchLocale(codeFromStorage)
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale })
      }

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }))
    }

    fetchInitialLocales()
  }, [setState])

  const setLanguage = useCallback(async (language: Language) => {
    console.log("language:------------------->",language)

    if (!languageMap.has(language.locale)) {
      console.log('nononono=======')
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))
    
      console.log('language.locale--->',language.locale)
      const locale = await fetchLocale(language.locale)
      console.log("locale:",locale)
      const enLocale = languageMap.get(EN.locale)

      languageMap.set(language.locale, { ...enLocale, ...locale })
      localStorage.setItem(LS_KEY, language.locale)

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))
    } else {
      
      const locale = await fetchLocale(language.locale)
   
      const enLocale = languageMap.get(EN.locale)

      languageMap.set(language.locale, { ...enLocale, ...locale })
      localStorage.setItem(LS_KEY, language.locale)
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))
    }
  }, [])

  const translate: TranslateFunction = useCallback(
    (key, data) => {
    
      const translationSet = languageMap.has(currentLanguage?.locale)
        ? languageMap.get(currentLanguage?.locale)
        : languageMap.get(EN.locale)
      const translatedText = translationSet && translationSet[key] || key

      const includesVariable = translatedText.match(/%\S+?%/gm)

      if (includesVariable && data) {
        let interpolatedText = translatedText
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, 'g')
          interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString())
        })

        return interpolatedText
      }
      
      return translatedText
    },
    [currentLanguage],
  )

  return <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>{children}</LanguageContext.Provider>
}
