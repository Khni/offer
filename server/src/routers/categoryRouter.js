const express = require('express')
const Category= require('../models/Category')
const Section= require('../models/Section')
const router = new express.Router()
const auth = require('../middleware/adminAuth')



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
   // let CategoryWithSections =  foundCategory
  //  CategoryWithSections.sectionsOfCategory.sectionOfCategory = "dd"
    let CategoryWithSections =  {...foundCategory.toObject(),sectionsOfCategory: await Promise.all( foundCategory.sectionsOfCategory.map(async(SOC)=>{
      return  await Section.findOne({_id: SOC.sectionOfCategory })
        // return await sections.filter((section) => section._id === SOC.sectionOfCategory)
    }) )   }
   /* let CategoryWithSections = foundCategory.sectionsOfCategory.map((categorySection) =>{
        return {...categorySection, sectionsOfCategory: sectionsOfCategory.map(async(section)=>{
            return await Section.find({_id: section._id})
        })}
    })
    
    
    , sectionOfCategory :foundCategory.sectionsOfCategory.map(async(categorySection)=>{
        return await sections.filter((s)=>{
        return s._id === categorySection.sectionOfCategory
    })
        //    return (await sections).filter
        // return await Section.find({_id: SectionOfCategory._id})
     }) 
    */


    try {
       // await category.save()
        res.status(201).send(CategoryWithSections)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router