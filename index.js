const express=require("express");
const app=express();
const Joi=require("joi")

app.use(express.json());
app.get('/',async(req,res)=>{
  const schema=Joi.object({
    email:Joi.string().email().required(),
    amount:Joi.number().integer().required()
  });

  const {error}=schema.validate(req.body);
   if(error){
    return res.status("400").json({
        error: error.details[0].message
    });
      
   }
   try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST", // or 'PUT'
      headers: {
        Authorization: 'Bearer sk_test_c328a30c0d74020826d54e52a521d89aa2755d36',
        'Content-Type': 'application/json'
      },
    
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    console.log("Success:", result);
    res.send(result)
  } catch (error) {
    console.error("Error:", error);
  }
})






app.listen(3000,()=>{
    console.log('listen 300!!!!!');
})