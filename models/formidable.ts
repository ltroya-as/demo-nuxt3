export type FormidableField = {
  id: string
  name: string
  for: string
  in_section: string
  value: string | string[]
  rawValue: string
  label: string
  type: string
  options: string
  fieldOptions: {
    classes: string
  }
  defaultValue: string
  required: boolean
  component: string
  placeholder: string
  rules: string
  field_order: string
}

export type CheckboxGroupOption = {
  label: string
  value: string
}
