import mongoose , { Schema } from 'mongoose';



//a simple fixture link for a fixture
const fixtureLinkSchema:Schema = new Schema({

    fixture:{
        type: Schema.Types.ObjectId,
        ref:'Fixture',
        required:true
    },

    unique_link:{
        type:String,
        required: true
    }



}, { timestamps: true })



const fixtureLinkModel = mongoose.model('Fixturelink', fixtureLinkSchema )

export default  fixtureLinkModel;