import * as actionTypes from "../types";
import * as APIs from './APIs'

import * as calls from './axiosCalls'
import axiosInstance from '../../helpers/axiosInstance'

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


export const fetchFavorites = (token,refreshToken,refreshTokenFunc) => {
  return async dispatch => {
console.log("fetch favorote lis");
    dispatch({
      type: actionTypes.FRTCH_FAVORITES_START
    });
    let url = APIs.GET_USER_FAVORITES
    try {
      let response = await axiosInstance(null,token,refreshToken,refreshTokenFunc).get(url)

      dispatch({
        type: actionTypes.FRTCH_FAVORITES_SUCCESS,
        list: response.data.favoriteProducts
      });
    } catch (e) {

      //try to refresh the token if its expired
      // if (e.response.data.error == "TokenExpiredError") {
     

      //   const newToken = await RefreshToken(refreshToken, dispatch)
      //   if (!newToken) { //if the refreshToken expired or wrong .. log out
      //     return dispatch({
      //       type: actionTypes.FRTCH_FAVORITES_ERROR,
      //       error: "error"
      //     });
      //   }
      //   let Favoriteresponse = await calls.getDataHeaderAuth(url, newToken)

      //   return dispatch({
      //     type: actionTypes.FRTCH_FAVORITES_SUCCESS,
      //     list: Favoriteresponse.data.favoriteProducts
      //   });





      // }
      //end of refresh try




    }
  }
}




// export const ToggleFavorite  = async (token,refreshToken, setState, productID)  =>{
//     if (!token) {
//       return
//     }

//     setState({ favorite: !this.state.favorite })
//     try {
//       const response = await calls.postDataHeaderAuth('/api/favorite/addanddelete', { productID: productID }, token)
//    console.log("response"+ response);
//     } catch (e) {
//       console.log("e"+ e.response.data.error);
//       //try to refresh the token if its expired
//       if ( e.response.data.error =="TokenExpiredError") {
        
// const newToken = await RefreshToken(refreshToken, dispatch)
//         if (!newToken) { //if the refreshToken expired or wrong .. log out
//           return dispatch({
//             type: actionTypes.FRTCH_FAVORITES_ERROR,
//             error: "error"
//           });
//         }
//         let Favoriteresponse = await calls.getDataHeaderAuth(url, newToken)





//       }
//       //end of refresh try
//       if (e) {
//         setState({ favorite: !this.state.favorite })

//       }
//     }



//   }








export const fetchSeen = (token) => {
  return async dispatch => {

    dispatch({
      type: actionTypes.FRTCH_SEEN_START
    });
    let url = APIs.GET_USER_SEEN
    try {
      let response = await calls.getDataHeaderAuth(url, token)

      dispatch({
        type: actionTypes.FRTCH_SEEN_SUCCESS,
        list: response.data.ViewedProducts
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FRTCH_SEEN_ERROR,
        error: error.response.data.error
      });
    }
  }
}



export const fetchFavoritesStart = () => {
  return {
    type: actionTypes.FRTCH_FAVORITES_START
  };
};

export const fetchFavoritesSuccess = (list) => {
  return {
    type: actionTypes.FRTCH_FAVORITES_SUCCESS,
    list: list
  };
};

export const fetchFavoritesError = error => {
  return {
    type: actionTypes.FRTCH_FAVORITES_ERROR,
    error: error
  };
};


export const favoriteListAction = (token) => {
  return {
    type: actionTypes.FAVORITE_LIST_ACTION,
    token: token

  };
};
//seen

export const fetchSeenStart = () => {
  return {
    type: actionTypes.FRTCH_SEEN_START
  };
};

export const fetchSeenSuccess = (list) => {
  return {
    type: actionTypes.FRTCH_SEEN_SUCCESS,
    list: list
  };
};

export const fetchSeenError = error => {
  return {
    type: actionTypes.FRTCH_SEEN_ERROR,
    error: error
  };
};


export const seenListAction = (token) => {
  return {
    type: actionTypes.SEEN_LIST_ACTION,
    token: token

  };
};
