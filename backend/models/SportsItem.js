import mongoose from 'mongoose';

const sportsItemSchema = new mongoose.Schema({
  unique_key: { type: String },
  title: { type: String, required: true },
  summary: { type: String },
  url: { type: String, required: true },
  source: { type: String }, 
  published_at: { type: String }, 
  fetched_at: { type: String },
  category: { type: String, default: 'Sports' },
}, {
  collection: 'sports', 
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret.unique_key || ret._id;
      ret.sourceId = ret.source;
      ret.publishedAt = ret.published_at;
      ret.fetchedAt = ret.fetched_at;
      
      delete ret._id;
      delete ret.__v;
      delete ret.unique_key;
      delete ret.source;
      delete ret.published_at;
      delete ret.fetched_at;
    }
  }
});

export const getSportsModel = (connection) => {
  return connection.model('SportsItem', sportsItemSchema);
};