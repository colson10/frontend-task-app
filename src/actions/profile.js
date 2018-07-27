import superagent from 'superagent';

const API_URL = 'http://localhost:3000';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const profileFetchRequest = () => (store) => {
  console.log('hello');
  const { token } = store.getState();
  console.log(token, API_URL);
  return superagent.get(`${API_URL}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      console.log(response.body, 'this is the response body');
      return store.dispatch(setProfile(response.body));
    });
};

const profileUpdateRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/profile`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

export { profileUpdateRequest, profileFetchRequest };
