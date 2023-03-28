import axios from 'axios'

const token = ''

export const fetch = async (baseUrl: string, subUrl: string): Promise<any> => {
  return await axios.get(`${baseUrl}/${subUrl}`, { headers: { authorization: token } })
}
