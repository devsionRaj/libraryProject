const Library = require('../models/libraryModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getLibraryRecord = factory.getOne(Library);
exports.createLibraryRecord = factory.createOne(Library);
exports.updateLibraryRecord = factory.updateOne(Library);
exports.deleteLibraryRecord = factory.deleteOne(Library);