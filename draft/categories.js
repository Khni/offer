const categories = [
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "electronics"
  , "parent": "/"
  , "category": "/electronics"
}, 


{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "embedded"
  , "parent": "/electronics"
  , "category": "/electronics/embedded"
}, 
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "controllers"
  , "parent": "/electronics"
  , "category": "/electronics/controllers"
}, 

{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "cases"
  , "parent": "/electronics"
  , "category": "/electronics/cases"
}, 

{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "big"
  , "parent": "/electronics/cases"
  , "category": "/electronics/cases/big"
}, 
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "small"
  , "parent": "/electronics/cases"
  , "category": "/electronics/cases/small"
}, 


] 

const Products= [
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "product1"
  , "cost": 125
  , "currency": "USD"
  , "categories": ["/electronics/embedded"]
},
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "product2"
  , "cost": 134
  , "currency": "USD"
  , "categories": ["/electronics/controllers"]
},
{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "product3"
  , "cost": 133
  , "currency": "USD"
  , "categories": ["/electronics/cases/big"]
},

{
    "_id": ObjectId("54fd7392742abeef6186a68e")
  , "name": "product4"
  , "cost": 188
  , "currency": "USD"
  , "categories": ["/electronics/cases/small", "/electronics/cases"]
},

] 


I want to make an object  to be like that :
const AllCategories = {
   { 
"name" : "electronics", 
	"categories" : {
{ "name" : "embedded", 
"categories": {}, 
"products" :{{"name" : "product1"} } 
}, 
{ "name" : "controllers", 
"categories": {}, 
"products" :{{"name" : "product2"} } 
},
{ "name" : "cases", 
"categories": {{"name" : "big", 
"products" :{{"name" : "product3"} } 
}, {"name" :"small", 
"products" :{{"name" : "product4"} } 
}, 

"products" :{{"name" : "product4"} } 
}
}







[
   { _id: "Books", path: null },
   { _id: "Programming", path: ",Books," },
   { _id: "Databases", path: ",Books,Programming," },
   { _id: "Languages", path: ",Books,Programming," },
   { _id: "MongoDB", path: ",Books,Programming,Databases," },
   { _id: "dbm", path: ",Books,Programming,Databases," },
   { _id: "Java", path: ",Books,Programming,Languages," },
   { _id: "C++", path: ",Books,Programming,Languages," },
   { _id: "C", path: ",Books,Programming,Languages," }, 
   { _id: "Functional", path: ",Books,Programming,Languages,Java," },
   { _id: "Spring", path: ",Books,Programming,Languages,Java," },
   { _id: "MicroServices", path: ",Books,Programming,Languages,Java," },
] 