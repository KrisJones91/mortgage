const { Schema } = require('mongoose')

const Goals = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  creatorId: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtual: true } }
)

Goals.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Goals
