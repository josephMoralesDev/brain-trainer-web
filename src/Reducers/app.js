const defaultState = {
  start: false,
}


const app = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        start: !state.open
      }
    default:
      return state
  }
}

export default app;
