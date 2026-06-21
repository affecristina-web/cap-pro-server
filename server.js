const express=require('express');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.post('/create-checkout-session',async(req,res)=>{
const{priceId,email,nombre}=req.body;
try{
const session=await stripe.checkout.sessions.create({
mode:'subscription',
payment_method_types:['card'],
customer_email:email,
line_items:[{price:priceId,quantity:1}],
success_url:'https://cap-pro-server.onrender.com/success',
cancel_url:'https://cap-pro-server.onrender.com/cancel',
locale:'es',
metadata:{nombre}
});
res.json({url:session.url});
}catch(err){
res.status(500).json({error:err.message});
}
});
app.get('/',(req,res)=>res.send('CAP PRO Server OK'));
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log('Servidor activo '+PORT));
