const {
  REACT_APP_API,
  REACT_APP_URL
} = process.env;

const apiUrl = REACT_APP_API || 'http://localhost:8080/api'
const appUrl = REACT_APP_URL || 'http://localhost:3000'

export const Constants = {
  apiUrl: apiUrl,
  appUrl: appUrl,
};