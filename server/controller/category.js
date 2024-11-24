const Category = require('../model/category');

const category = async(req,res)=>{
   try {
      const { category_name } = req.body;
      const category_image=req.file.filename;
      const existingCategory = await Category.findOne({ category_name });
    
      if (existingCategory) {
        return res.send({ message: "Category already exists",success:false });
      }
    
      const newCategory = new Category({ category_name,category_image });
      const addedCategory = await newCategory.save();
    
      res.json({ addedCategory, success: true });
   }
   catch(err){
    console.log('Internal Error',err)
   }
}

const viewcategory=async(req,res)=>{
 try{
    const getCategory=await Category.find();
    const success=true;
    res.send(getCategory)
 }
 catch(err){
    console.log('Internal Error',err)
 }
}

const deleteCategory=async(req,res)=>{
   try{
      const findCategory=await Category.findById(req.params.id);
      if(!findCategory){
         const success=false;
         res.send({massege:'Category Not Found',success})
      }
      const FindedCategory=await Category.findByIdAndDelete(req.params.id)
      res.send({FindedCategory})
   }
   catch(err){
      console.log(err)
   }
}
const updateCategory=async(req,res)=>{
    try{
        const {category_name}=req.body;
      const category_image=req.file.filename;
        
        const findCategory=await Category.findById(req.params.id)
        if(!findCategory){
            const success=false
            res.send({massge:"Category not Found",success})
        }
        const NewCategory={}
        if(category_name) {NewCategory.category_name=category_name}
        if(category_image) {NewCategory.category_image=category_image}
        const updateCategory=await Category.findByIdAndUpdate(req.params.id,{$set:NewCategory},{new:true})

        res.send(updateCategory)
    }
    catch(err){
    console.log('Internal Error',err)
 }
}
module.exports={category,viewcategory,updateCategory,deleteCategory}