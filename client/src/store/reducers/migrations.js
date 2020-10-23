export const migrations = {
  0: state => {
    return {
      ...state,
      userAuth: {
        ...state.userAuth,
        authUser:{...state.userAuth.authUser, updatedError: '' }
      },
    };
  },
};