const airDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_AIR_DATA':
      return [
        action.payload.data,
      ];
    default:
      return state;
  }
};

export default airDataReducer;
