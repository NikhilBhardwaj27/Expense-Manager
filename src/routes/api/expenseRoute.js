const router = require('express').Router()
const Expense = require('../../modals/expenseModal')
const User = require('../../modals/userModal')
const middleware = require('../../middleware/middleware')


const dateFormat = ()=>{
    // Changing Date Format
    const d = new Date()
    const ye = new Intl.DateTimeFormat('en',{year:'numeric'})
    .format(d)
    const mo = new Intl.DateTimeFormat('en',{month:'numeric'})
    .format(d)
    const da = new Intl.DateTimeFormat('en',{day:'2-digit'})
    .format(d)
    const date1 = `${ye}/${mo}/${da}`
    return date1

}
/*  @Route -- /route/api/expense/add-expenses
    @Access -- Private
    @Method -- POST
*/
router.post('/expenses/add-expense',middleware,async (req,res)=>{
    const {ItemName,ItemAmount,ItemCategory} = JSON.parse(req.body.body)
    
    //Checking for empty Field
    if(!ItemName || !ItemCategory || !ItemAmount){
        res.send({message:"Fields must not be empty"})
    }
    const expense = new Expense({
        UserId:req.user._id,
        ItemName,
        ItemAmount,
        ItemCategory,
        date:dateFormat()
    })
    try {
        // Saving to database
        const result = await expense.save()
        res.json(result)
    }catch(e){
        res.send({message:e})
    }
})

/*  @Route -- /route/api/expenses
    @Access -- Private
    @Method -- GET
*/
router.get('/expenses',middleware,async(req,res)=>{  
    // saving to database
    try{
        const result = await Expense.find({UserId:req.user._id})
        res.status(200).json(result)
    }catch(e){
        res.status(500).send({message:e})
    }
})

/*  @Route -- /route/api/expenses/delete
    @Access -- Private
    @Method -- DELETE
*/
router.delete('/expenses/delete',middleware,async(req,res)=>{
    
    const _id = req.headers.id
    try{
        // deleting Item from database
        const result = await Expense.findByIdAndDelete({_id:_id})
        console.log(result)
        res.json(result)

    }catch(e){
        res.send({message:e})
    }
})

/*  @Route -- /route/api/expenses/update
    @Access -- Private
    @Method -- UPDATE
*/
router.patch('/expenses/update',middleware,async(req,res)=>{
    const {_id,ItemName,ItemAmount,ItemCategory} = JSON.parse(req.body.body)

    console.log(_id)
     //Checking for empty Field
     if(!ItemName || !ItemCategory || !ItemAmount){
        return res.send({message:"Fields must not be empty"})
    }

    try{
        // Updating Item in database
        const result = await Expense.findOneAndUpdate({_id:_id},{$set:
            {ItemName:ItemName,ItemAmount:ItemAmount,ItemCategory:ItemCategory,date:dateFormat()
            }})
            
            res.json(await Expense.findOne({_id:_id}))
    }catch(e){
        res.send({message:'Item Not present'})
    }
})

/*  @Route -- /route/api/expenses/item
    @Access -- Private
    @Method -- GET
*/
router.get('/expenses/item',middleware,async(req,res)=>{
    try{
        // Finding item with id
        const result = await Expense.findOne({_id:req.query.id})
        console.log(result)
        res.status(200).json(result)
    }catch(e){
        res.status(400).send({message:"Item Not Found"})
    }
})

module.exports = router;