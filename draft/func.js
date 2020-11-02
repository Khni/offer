"e": {
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "productID": 1
    },
    "keyValue": {
        "productID": "5f6e12ee4dd46300176473f4"
    }
}
}

it means productID set to be index .. just drop it from mongodb site


const product =[
    
    
   {
   
   id: 1,
   favorites:[
       user= 9,
       user= 7,
       
   ]
   
   } ,
   
   
   {
   
   id: 2,
  favorites:[
       user= 2,
       user= 3,
       user=1
   ]
   
   },
   
   { 
   
   
   
   
   
   id: 3,
   favorites:[
       user= 1,
       user= 1,
       user= 1,
       user= 1,
       
   ]
   
   } 
   
]

//sort products list depends on Favorite list,, seen list, 
function compare(a, b) {
 const favoriteLengthA = a.favorites.length; 
 const favoriteLengthB = b.favorites.length; 
 
 
 
 
 
 
 let comparison = 0;
  if (favoriteLengthA > favoriteLengthB) { comparison = 1; } else if
   (favoriteLengthA < favoriteLengthB) { 
   comparison = -1;
    } 
   return comparison; }
   
  console.log(JSON.stringify(product.sort(compare)))
 


//1- find index of userID to sort the favorites products depend on created time 
const product =[
    
    
   {
   
   id: 1,
   favorites:[
       {
         userID: 100,
         created: 1267
     },
     
     {
         userID: 200,
         created: 1567
     },
     
     {
         userID: 300,
         created: 1846
     }
       
   ]
   
   } ,
   
   
   {
   
   id: 2,
  favorites:[
       {
         userID: 100,
         created: 234
     },
     
     {
         userID: 200,
         created: 662
     },
     
     {
         userID: 300,
         created: 762
     }
   ]
   
   },
   
   { 
   
   
   
   
   
   id: 3,
   favorites:[
     {
         userID: 100,
         created: 99
     },
     
     {
         userID: 200,
         created: 987
     },
     
     {
         userID: 300,
         created: 8888
     }
     
       
   ]
   
   } 
   
]


function compare(a, b) {
// const favoriteLengthA =
const userIndex =a.favorites.indexOf(a.favorites.find(f=> f.userID ==300))
 console.log('index'+userIndex) //a.favorites[a.favorites.indexOf(a.favorites.filter(f=> f.userID ==200))].created; 
 
 const favoriteLengthA = b.favorites[userIndex].created; 
 const favoriteLengthB = a.favorites[userIndex].created; 
 
 
 
 
 
 
 let comparison = 0;
  if (favoriteLengthA > favoriteLengthB) { comparison = 1; } else if
   (favoriteLengthA < favoriteLengthB) { 
   comparison = -1;
    } 
   return comparison; }
   
  console.log(JSON.stringify(product.sort(compare)))




