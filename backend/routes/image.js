const express = require("express")
const { ImageModel } = require("../schema/Image")
const fetchallimage = require('../middleware/fetchdata');
const router = express.Router()
const path = require('path');
const upload = require('../middleware/multer');

router.post("/uploadimage", fetchallimage, upload.single('image')  ,async(req, res)=>{
    const {name} = req.body
    console.log(req.file)
    const filename = req.file ? req.file.filename : null
    const path = req.file ?  req.file.destination : null
    console.log(req.file)
    
    try {
        const newImage = new ImageModel({filename, name, path})
       const image = await newImage.save()
       res.send(image);
        res.status(200).json({msg:`${filename} image uploaded success`, success:true})
    } catch (error) {
         res.status(500).json({msg:`${filename} NOT uploaded`, success:false})
    }
})

router.get("/image/:id", fetchallimage, async (req, res) => {
    try {
        const { id } = req.params;
        const img = await ImageModel.findById(id);

        if (!img) {
            return res.status(404).json({ msg: "Image not found", success: false });
        }

        const imagePath = path.join(__dirname, 'Images', img.filename);
        res.sendFile(imagePath);

    } catch (error) {
        res.status(500).json({ msg: `Image NOT Found`, success: false });
    }
});

module.exports = router;