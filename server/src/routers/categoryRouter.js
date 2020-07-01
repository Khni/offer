const express = require('express')
const Category= require('../models/Category')
const Section= require('../models/Section')
const router = new express.Router()
const auth = require('../middleware/adminAuth')
const Product= require('../models/Product')



router.post('/category/add', auth, async (req, res) => {
    const category = new Category({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/category/findone/:id', auth, async (req, res) => {
    let foundCategory = await Category.findOne({_id: req.params.id})
    let sections = await Section.find({})
  


/*let CategoryWithSections =  {...foundCategory.toObject(),sectionsOfCategory: 
        await Promise.all
        ( foundCategory.sectionsOfCategory.map(async(SOC)=> await Section.findOne({_id: SOC.sectionOfCategory }) )).then(async(section)=>{
            
            
            return {...section,
                 productsOfSections: await Promise.all(sections.productsOfSection.map(async(POS)=>await Product.findOne({_id: POS.productOfSection }))) } 
            
 
        })}*/




 
/*   let CategoryWithSections =  {...foundCategory.toObject(),sectionsOfCategory: 
        await Promise.all
        ( foundCategory.sectionsOfCategory.map(async(SOC)=>SOC)).then(async(SOC)=>{
            let sections=  await Section.findOne({_id: SOC.sectionOfCategory })
            
            return {...sections.toObject(),
                 productsOfSections: await Promise.all(sections.productsOfSection.map(async(POS)=>POS))
                 .then(async(POS)=>{
                return await Product.findOne({_id: POS.productOfSection })
            })} 
            
 
        })}*/
        
        
        
/*   let CategoryWithSections = 
{...foundCategory.toObject(),sectionsOfCategory: 
        await Promise.all(  foundCategory.sectionsOfCategory.map(async(SOC)=>{
               return Section.findOne({_id: SOC.sectionOfCategory })
        }))}
        
        
     let CatwProducts = {...CategoryWithSections,
        productsOfSection:
     await Promise.all( CategoryWithSections.sectionsOfCategory.productsOfSection.map(async(POS)=>{
         return await Product.findOne({_id: POS.productOfSection })
     }))
      }
*/
   
   
  /* Promise.all( items.map(item =>item) ).then(result => 
console.log(result))
   
   let CategoryWithSections =  {...foundCategory.toObject(),sectionsOfCategory: 
        await Promise.all( foundCategory.sectionsOfCategory.map(async(SOC)=>{
            let sections=  await Section.findOne({_id: SOC.sectionOfCategory })
            return {...sections.toObject(), productsOfSections: 
                sections.productsOfSection.map(async(POS)=>{
                     return await Product.findOne({_id: POS.productOfSection })
                })
              }
        // return await sections.filter((section) => section._id === SOC.sectionOfCategory)
    }) )   } */
   
   
    let CategoryWithSections =  {...foundCategory.toObject(),sectionsOfCategory: 
        await Promise.all( foundCategory.sectionsOfCategory.map(async(SOC)=>{
            let sections=  await Section.findOne({_id: SOC.sectionOfCategory })
            return {...sections.toObject(), productsOfSections: 
                sections.productsOfSection.map(async(POS)=>{
                     return await Product.findOne({_id: POS.productOfSection })
                })
              }
        // return await sections.filter((section) => section._id === SOC.sectionOfCategory)
    }) )   } 



    try {
 
        res.status(201).send(CategoryWithSections)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/categories', auth, async (req, res) => {
    let Categories = await Category.find({})
  
   
    let CategoriesWithSectionsAndProducts = 
     await Promise.all(
         Categories.map((category)=> {
           return {...category.toObject(), sectionsOfCategory: 
            category.sectionsOfCategory.map(async(SOC)=>{
    let sections=  await Section.findOne({_id: SOC.sectionOfCategory })
           return {...sections, productsOfSection: 
            sections.productsOfSection.map(async(POS)=>{
                    return await Product.findOne({_id: POS.productOfSection })
               })
             }}) 
} })

) 


    try {
 
        res.status(201).send(CategoriesWithSectionsAndProducts)
    } catch (e) {
        res.status(400).send(e)
    }
})




router.get('/categoriegenderfilter/:gender', auth, async (req, res) => {
	
    let Categories = await Category.find({})
  
   
    let CategoriesWithSectionsAndProducts =  await Promise.all(Categories.map((category)=> {
           return {...category.toObject(), sectionsOfCategory: category.sectionsOfCategory.map(async(SOC)=>{
    let sections=  await Section.findOne({_id: SOC.sectionOfCategory }, {gender : { $in: [req.params.gender, "all" ] }} )
           return {...sections, productsOfSection: sections.productsOfSection.map(async(POS)=>{
                    return await Product.findOne({_id: POS.productOfSection },  {gender : { $in: [req.params.gender, "all" ] }} )
                })
            }})
} })) 


    try {
 
        res.status(201).send(CategoriesWithSectionsAndProducts)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router