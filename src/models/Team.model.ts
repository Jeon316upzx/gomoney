import mongoose , { Schema, SchemaTypes } from 'mongoose';


export interface TeamDocument extends mongoose.Document {
    owner: string;
    team_title: string;
    slogan?: string;
    year_founded: string;
    flag_thumbnail?:string;
    made_by:string;
    createdAt: Date;
    updatedAt: Date;
  }



//a simple team model consisting of a title, slogan, year founded, flag and owner
const teamSchema:Schema = new Schema({

    team_title:{
        type: String,
        required: true
    },

    slogan:{
      type:String,
    },

    year_founded:{
        type: String,
        required:true
    },

    flag_thumbnail:{
        type: String,
    },

    owner:{
        type:String,
        required: true
    },

    made_by:{
        type: Schema.Types.ObjectId,
        required:true
    }

}, { timestamps: true })



const teamModel = mongoose.model<TeamDocument>('Team', teamSchema )
export default  teamModel;