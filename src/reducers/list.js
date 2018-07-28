export default (state = [], { type, payload }) => {
  switch (type) {
    case 'LIST_SET':
      if (state.indexOf(payload) < 0) {
        return [payload, ...state];
      }
      return state;
    case 'LISTS_GET':
      return payload;
    case 'LIST_REMOVE':
      return state.filter(list => list._id !== payload._id);
    case 'LIST_UPDATE':
      return state.map(list => (list._id === payload._id ? payload : list));
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
