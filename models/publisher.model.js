const mongoose = require('mongoose');
const PublishersSchema = require('../schemas/publisher.shema.js')

const PublisherModel = mongoose.model("Publisher", PublishersSchema);

module.exports = PublisherModel;