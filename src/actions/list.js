import superagent from 'superagent';
import { API_URL } from '../routes';

const setList = list => ({
  type: 'LIST_SET',
  payload: list,
});

const getLists = lists => ({
  type: 'LISTS_GET',
  payload: lists,
});

const listCreateRequest = list => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${API_URL}/lists`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...list, profile: profile._id })
    .then((response) => {
      return store.dispatch(setList(response.body));
    });
};

const fetchAllLists = () => (store) => {
  const { token, profile } = store.getState();
  return superagent.get(`${API_URL}/lists/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getLists(response.body));
    });
};

export { 
  setList, 
  getLists, 
  listCreateRequest, 
  fetchAllLists,
};
