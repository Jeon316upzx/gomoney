import mongoose , { Schema } from 'mongoose';

// a simple fixture consisting of two teams, a date and status
const fixtureSchema:Schema = new Schema({

    team1:{
        type: Schema.Types.ObjectId,
        ref:'Team',
        required:true
    },

    team2:{
        type: Schema.Types.ObjectId,
        ref:'Team',
        required:true
    },

    fixture_date:{
        type:Date,
        required: true
    },

    fixture_status:{
        type: String,
        required: true
    },
    made_by:{
        type: Schema.Types.ObjectId,
    }

}, { timestamps: true })



const fixtureModel = mongoose.model('Fixture', fixtureSchema )
export default  fixtureModel;