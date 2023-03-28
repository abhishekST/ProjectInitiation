const envVars = process.env

export const configuration = {
  resourceUrl: envVars.REACT_APP_RESOURCE_API_URL ?? '',
  projectUrl: envVars.REACT_APP_PROJECT_API_URL ?? '',
  fetchResourceUrl: envVars.REACT_APP_FETCH_RESOURCE_API_URL ?? ''
}
