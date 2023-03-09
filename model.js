import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },
    rating : {
        type:String,
        required : true
    },
    review : {
        type:String,
        required : true
    }

})

export default mongoose.model('Review', reviewSchema);

