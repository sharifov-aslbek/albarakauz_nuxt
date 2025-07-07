export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    const req = nuxtApp.ssrContext?.req
    const acceptLanguage = req?.headers['accept-language']
    let locale = 'uz' // default
    
    if (acceptLanguage) {
      if (acceptLanguage.includes('ru')) {
        locale = 'ru'
      }
    }
    
    nuxtApp.$i18n.setLocale(locale)
  } else {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale) {
      nuxtApp.$i18n.setLocale(savedLocale)
    }
  }
})