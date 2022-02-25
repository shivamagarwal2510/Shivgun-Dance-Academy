const express=require('express');
const mongoose =require('mongoose');
const path=require('path');
const app=express();
const port=8000;
//Define mongoose schema
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/ContactDance');
    const ContactSchema = new mongoose.Schema({
        name: String, 
        email: String, 
        phone: String, 
        address: String, 
        gender: String, 
    });
    const Contact = mongoose.model('Contact', ContactSchema); 
    app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).send("Your Data has been saved successfully.")
    }).catch(()=>{
        res.status(400).send("Cannot save the Data.")
    });
}) 
}

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static('static'));           // For serving static files
app.use(express.urlencoded());
//Pug specific stuff
app.set('view engine', 'pug')                           //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   
// END Points
app.get('/', (req, res)=>{
    const params= {title:"Shivgun Dance Academy"};
    res.status(200).render('home',params);
})
app.get('/contact', (req, res)=>{
    const params= {title:"Shivgun Dance Academy"};
    res.status(200).render('contact.pug',params);
})
app.get('/services', (req, res)=>{
    const params= {};
    res.status(200).render('services.pug',params);
})


app.listen(port, ()=>{
    console.log(`Application Successfully started on port ${port}`);
})