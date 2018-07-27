import { fetchCookie } from '../utils/cookie';

const token = fetchCookie('TASKsubTASK');
const initialState = token || null;

export default (state = initialState, { type, payload }) => {
  console.log(token, 'this is the token');
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
