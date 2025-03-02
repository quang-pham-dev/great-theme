export interface Translations {
  translation: {
    common: {
      loading: string
      error: string
      success: string
      cancel: string
      save: string
      delete: string
      edit: string
      back: string
    }
    auth: {
      login: string
      register: string
      forgotPassword: string
      email: string
      password: string
    }
    settings: {
      title: string
      language: string
      theme: string
      notification: string
    }
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: Translations['translation']
    }
  }
}
