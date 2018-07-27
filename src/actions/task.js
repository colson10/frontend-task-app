import superagent from 'superagent';

const API_URL = 'http://localhost:3000';

const setTask = task => ({
  type: 'TASK_SET',
  payload: task,
});

const getTasks = tasks => ({
  type: 'TASKS_GET',
  payload: tasks,
});

const taskCreateRequest = task => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...task, profile: profile._id })
    .then((response) => {
      return store.dispatch(setTask(response.body));
    });
};

const fetchAllTasks = () => (store) => {
  const { token, profile } = store.getState();
  console.log(profile._id, 'this is the profile in the async function');
  return superagent.get(`${API_URL}/tasks/${profile._id}`)
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
