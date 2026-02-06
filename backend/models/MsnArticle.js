import mongoose from 'mongoose';

const msnSchema = new mongoose.Schema({
  id: { type: String }, 
  title: { type: String, required: true },
  abstract: { type: String }, 
  url: { type: String },
  provider: { type: String }, 
  publishedDateTime: { type: String }, 
  category: { type: String },
  imageUrl: { type: String },
  type: { type: String }, 
  likes: { type: Number }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret.id || (ret._id ? ret._id.toString() : ''); 
      ret.sourceId = ret.provider;
      ret.title = ret.title;
      ret.summary = ret.abstract;
      ret.url = ret.url;
      ret.publishedAt = ret.publishedDateTime;
      ret.category = ret.category;
      ret.fetchedAt = ret.publishedDateTime; 
      delete ret._id; delete ret.__v; delete ret.provider;
      delete ret.abstract; delete ret.publishedDateTime;
    }
  }
});

export const getMsnModel = (connection, collectionName) => {
  return connection.model(`Msn_${collectionName}`, msnSchema, collectionName);
};