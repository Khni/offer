// user auth and accout
export const USER_POST_LOGIN = '/api/login'
export const USER_POST_SIGNUP = '/api/user-signup'
export const USER_POST_UPDATE = '/api/user/update/' 
// export const USER_POST_FB_OAUTH = '/api/user/oauth/google' 
// export const USER_POST_GOOGLE_OAUTH = '/api/user/oauth/facebook' 
export const USER_POST_GOOGLE_OAUTH = '/api/goauth' 
export const USER_POST_FB_OAUTH = '/api/fbauth' 


//cart

export const CART_GET_SERVER = '/api/user-servercart'
export const CART_GET_LOCAL = '/api/user-localcart'

export const CART_POST_ADD = '/api/cart/add' 
export const CART_POST_DECREASE = '/api/cart/decrease' 
export const CART_POST_REMOVE = '/api/cart/removeproduct'
export const CART_POST_MERGE = '/api/cart-mergelocal'







//favorites and seen 
export const GET_USER_FAVORITES = '/api/user-favorites' 
export const GET_USER_SEEN = '/api/user-viewed' 



//user addresses
export const USER_POST_ADDRESS = '/api/user-add-address'
export const USER_POST_DEFAULT_ADDRESS = '/api/user-add-defaultAddress'
export const USER_GET_ADDRESSES = '/api/user-add-address'
export const USER_POST_ORDER = '/api/order/add'
export const USER_GET_ORDERS = '/api/user-add-address'

//admins
export const ADMIN_POST_LOGIN = '/api/admin/login'
export const ADMIN_GET_ORDERS = '/api/admin/orders/'
export const ADMIN_POST_CATEGORY = '/api/category/add'
export const USER_POST_SECTION = '/api/section/add'
export const USER_POST_PRODUCT = '/api/product/add' 
export const USER_POST_COLLECTION = '/api/collection/add' 

//(collections, products, categories, sections) fetching

export const GET_CATEGORIES_WITHALL = '/api/categoriesWithAll'
export const GET_SECTIONS_WITH_PRODUCTS = '/api/sections-with-products'
export const GET_SECTIONS = '/api/sections'
export const GET_COLLECTIONS = '/api/collections'
export const GET_PRODUCTIOS = '/api/products'
export const GET_CATEGORIES = '/api/categories'


