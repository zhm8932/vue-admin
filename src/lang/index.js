import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

import zhLocale from './zh'
import enLocale from './en'
import esLocale from './es'

import elementzhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementenLocale from 'element-ui/lib/locale/lang/en'
import elementesLocale from 'element-ui/lib/locale/lang/es'

const messages = {
  zh: {
    ...elementzhLocale,
    ...zhLocale
  },
  en: {
    ...elementenLocale,
    ...enLocale
  },
  es: {
    ...esLocale,
    ...elementesLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale)) {
      return locale
	}
  }
  return 'en'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
