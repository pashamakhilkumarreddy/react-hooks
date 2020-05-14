import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev',
  headers: {
    'token': 'foobar'
  }
})