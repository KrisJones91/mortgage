import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import GoalsSchema from '../models/Goals'
import TrackerSchema from '../models/Tracker'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Goals = mongoose.model('Goals', GoalsSchema);
  Tracker = mongoose.model('Tracker', TrackerSchema);
}

export const dbContext = new DbContext()
