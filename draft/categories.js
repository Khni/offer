const categoriesDocs = [
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

const ProductsDocs = [
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


//I want to make an object  to be like that:

const allCategories = [
  {

    name: "electronics",
    categories: [
      {
        name: "embedded",
        categories: [],
        products: [{ name: "product1" }]
      },
      {
        name: "controllers",
        categories: [],
        products: [{ name: "product2" }]
      },
      {
        name: "cases",
        categories: [
          {
            name: "big",
            categories: [],
            products: [{ name: "product3" }]
          },
          {
            name: "small",
            categories: [],
            products: [{ name: "product4" }]
          }
        ],
        products: [{ name: "product1" }]
      },

    ]

    ,
    products: [{ "name": "product4" }]

  }
]










Hello guys I wanted to implement Materialized Path Category Hierarchy to mongodb in nodejs application and if I have those 2 docs and I want to get array of all of them like a tree as I will explain


    const categoriesDocs = [
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
    
    const ProductsDocs = [
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


I want to have output Array like that:

    const allCategories = [
      {
    
        name: "electronics",
        categories: [
          {
            name: "embedded",
            categories: [],
            products: [{ name: "product1" }]
          },
          {
            name: "controllers",
            categories: [],
            products: [{ name: "product2" }]
          },
          {
            name: "cases",
            categories: [
              {
                name: "big",
                categories: [],
                products: [{ name: "product3" }]
              },
              {
                name: "small",
                categories: [],
                products: [{ name: "product4" }]
              }
            ],
            products: [{ name: "product1" }]
          },
    
        ]
    
        ,
        products: [{ "name": "product4" }]
    
      }
    ]

How can I get this array in this array by mongoose queries? 