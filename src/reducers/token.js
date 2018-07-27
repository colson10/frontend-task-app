import { fetchCookie } from '../utils/cookie';

const token = fetchCookie('Wunderlist Token');
const initialState = token || null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
