export const RefreshToken = async (refreshToken, dispatch) => {
  try {
    console.log("try refresh" + refreshToken);
    const res = await calls.getDataHeaderAuth('/api/token/refresh', refreshToken)


    console.log("tokens" + res.data.token + res.data.refreshToken);
    dispatch({
      type: actionTypes.REFRESH_TOKEN,
      token: res.data.token,
      refreshToken: res.data.refreshToken
    });


    return res.data.token

  } catch (error) {
    console.log("refresh error");
    dispatch({
      type: actionTypes.AUTH_LOGOUT
    });

    return false
  }


}