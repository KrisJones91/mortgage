import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import GoalsSchema from '../models/Goals'
import TrackersSchema from '../models/Trackers'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Goal = mongoose.model('Goal', GoalsSchema);
  Tracker = mongoose.model('Tracker', TrackersSchema);
}

export const dbContext = new DbContext()
