import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Trackers = new Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
  balance: { type: Number, required: false },
  payment: { type: Number, required: true },
  creatorId: { type: String, ref: 'Account', required: true }

},
{ timestamps: true, toJSON: { virtual: true } }
)

Trackers.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Trackers
