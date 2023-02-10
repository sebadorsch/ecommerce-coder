const {
  REACT_APP_API,
} = process.env;

const apiUrl = REACT_APP_API || 'http://localhost:8080/api'

export const Constants = {
  apiUrl: apiUrl,
};