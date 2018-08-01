import superagent from 'superagent';
import { API_URL } from '../routes';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const profileFetchRequest = () => (store) => {
  const { token } = store.getState();
  console.log(API_URL);
  return superagent.get(`${API_URL}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
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
