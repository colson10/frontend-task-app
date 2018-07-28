import superagent from 'superagent';

const API_URL = 'http://localhost:3000';

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
  console.log(profile._id, 'this is the profile in the async function');
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
