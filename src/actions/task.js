import superagent from 'superagent';
import { API_URL } from '../routes';

const setTask = task => ({
  type: 'TASK_SET',
  payload: task,
});

const getTasks = tasks => ({
  type: 'TASKS_GET',
  payload: tasks,
});

const taskCreateRequest = (task, list) => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...task, list, profile: profile._id })
    .then((response) => {
      return store.dispatch(setTask(response.body));
    });
};

const fetchAllTasks = list => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/tasks/${list}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getTasks(response.body));
    });
};

export { 
  setTask, 
  getTasks, 
  taskCreateRequest, 
  fetchAllTasks,
};
