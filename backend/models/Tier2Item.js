import mongoose from 'mongoose';

const tier2ItemSchema = new mongoose.Schema({
  unique_key: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String },
  url: { type: String, required: true },
  source: { type: String }, 
  published_at: { type: String },
  fetched_at: { type: String },
  
  category: { type: String, default: 'General' },
  isViral: { type: Boolean, default: false },
  viralityScore: { type: Number, default: 0 },
  engagementScore: { type: Number, default: 0 }
}, {
  collection: 'Articles', 
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret.unique_key;
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

export const Tier2Item = mongoose.model('Tier2Item', tier2ItemSchema);