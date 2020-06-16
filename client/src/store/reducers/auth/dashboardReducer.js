import { DASHBOARD_DATA } from '../../types/authUserTypes';
 
const DEFAULT_STATE = {
  email: '', 
  name:'', 
  phone:'', 
 addresses:[''],
 birthday:'' 
}
 
export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_DATA:
      return { ...state,
 email: action.email, 
 name:action.name, 
 phone:action.phone, 
 addresses:[action.address],
 birthday:action.birthday} 
 
    default:
      return state
  }
}