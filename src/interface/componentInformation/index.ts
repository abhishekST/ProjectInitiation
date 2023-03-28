export interface Client {
  designation: string
  email: string
  name: string
  id: number
}

export interface Project {
  uuid: string
  name: string
}

export interface GetClientFromCompany {
  client_name: Client[]
  company_address: string
  company_name: string
  country: string
  project_name: Project[]
  state: string
  uuid: string
}
