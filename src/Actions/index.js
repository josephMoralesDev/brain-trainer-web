export const setScene = scene => {
  return {
    type: 'SET_SCENE',
    scene
  }
}

export const setAnswer = answer => {
  return {
    type: 'SET_ANSWER',
    answer
  }
}

export const setScore = score => {
  return {
    type: 'SET_SCORE',
    score
  }
}

export const setNum = (numA, numB) => {
  return {
    type: 'SET_NUM',
    numA,
    numB
  }
}

export const setTimer = (timer) => {
  return {
    type: 'SET_TIMER',
    timer
  }
}

export const setUser = (userName, userId) => {
  return {
    type: 'SET_USER',
    userName,
    userId
  }
}
