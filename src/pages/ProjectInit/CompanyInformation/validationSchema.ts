/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { object, number, string, array } from 'yup'

const clientSchema = () => object({
  id: number().required(),
  name: string().required(),
  emails: string().required()
})

export const clientInfoValidationSchema = () => object({
  client: array().of(clientSchema()).min(1),
  address: string().required(),
  country: string().required(),
  company: string().required(),
  state: string().required()
})
