const envVars = process.env

export const configuration = {
  uri: (envVars.REACT_APP_SVC_URI ?? 'http://localhost:3000'),
  token: envVars.REACT_APP_TOKEN
}
