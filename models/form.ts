export type PhoneObject = {
  countryCode: number
  valid: boolean
  formatted: string
  number?: string
  country: {
    dialCode: string
  }
}
