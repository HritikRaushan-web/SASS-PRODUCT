const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  step: Number,
  title: String,
  desc: String,
  icon: String
}, { _id: false });

const benefitSchema = new mongoose.Schema({
  title: String,
  desc: String,
  metric: String
}, { _id: false });

const importanceSchema = new mongoose.Schema({
  point: String,
  explanation: String
}, { _id: false });

const faqSchema = new mongoose.Schema({
  q: String,
  a: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  bannerTitle: {
    type: String
  },
  bannerTag: {
    type: String
  },
  tagline: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  badge: {
    type: String,
    default: 'Popular'
  },
  image: {
    type: String
  },
  smallIntro: {
    type: String // Video embed URL
  },
  checklist: [{
    type: String
  }],
  howItWorks: [stepSchema],
  benefits: [benefitSchema],
  importance: [importanceSchema],
  features: [{
    type: String
  }],
  techStack: [{
    type: String
  }],
  demos: [{
    name: String,
    url: String,
    type: { type: String, default: 'external' }
  }],
  includedFiles: [{
    type: String
  }],
  faqs: [faqSchema],
  downloadPackageUrl: {
    type: String,
    default: 'https://downloads.prestigeintelligence.com/packages/latest'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  salesCount: {
    type: Number,
    default: 142
  },
  rating: {
    type: Number,
    default: 4.95
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
