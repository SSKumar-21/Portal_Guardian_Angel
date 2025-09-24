import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.FIREBASE_DATABASE_URL ;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/:IDuser",async (req,res)=>{
    try{
        let msg;
        const response = await axios.get(`${url}/users.json`);
        const id = req.params.IDuser;
        const Users = response.data;

        let statusN;
        if(Users[id].liveTracking.status == true){
            statusN = 1;
        } else {
            statusN = 0;
        }

        res.render('index.ejs',{
            map : `https://maps.google.com/maps?q=${Users[id].liveTracking.latitude},${Users[id].liveTracking.longitude}&z=15&output=embed`,
            sat: statusN
          });
        
    } catch (error) {
        console.log(`Error Occur: ${error}`);
    }
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}...`);
})