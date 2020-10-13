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