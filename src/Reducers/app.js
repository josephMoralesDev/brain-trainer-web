const defaultState = {
  userName: "",
  userId: "",
  scene: "HOME",
  answer: 0,
  score: 0,
  timer: 30,
  numA: Math.floor(Math.random() * (100 - 1) + 1),
  numB: Math.floor(Math.random() * (100 - 1) + 1),
  correctBox: Math.floor(Math.random() * (5 - 1) + 1),
  box1: 0,
  box2: 0,
  box3: 0,
  box4: 0,
}

const getRandom = (answer) => {
  const rand = Math.floor(Math.random() * (answer - (answer - 5)) + (answer - 5));
  if (rand === answer) {
    getRandom();
  }
  return rand;
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        scene: action.scene
      }
    case 'SET_SCORE':
      return {
        ...state,
        score: action.score
      }
    case 'SET_NUM':
      return {
        ...state,
        numA: action.numA,
        numB: action.numB,
        answer: action.numA + action.numB,
        correctBox: Math.floor(Math.random() * (5 - 1) + 1),
        box1: getRandom(action.numA + action.numB),
        box2: getRandom(action.numA + action.numB),
        box3: getRandom(action.numA + action.numB),
        box4: getRandom(action.numA + action.numB),
      }
    case 'SET_TIMER':
      return {
        ...state,
        timer: action.timer,
      }
    case 'SET_USER':
      return {
        ...state,
        userName: action.userName,
        userId: action.userId,
      }
    default:
      return state
  }
}

export default app;
