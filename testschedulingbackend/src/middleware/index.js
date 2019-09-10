/* eslint-disable no-unused-vars */
const mongodb = require('mongodb');
const upload = require('multer')({dest: __dirname + '/uploads'});
const fs = require('fs');
const logger = require('../logger');
const assert = require('assert');

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  /**
   * This middleware will upload a file to a temporary uploads folder,
   * and then it will delete them once it has been transferred to mongodb's
   * GridFS system.
   */
  app.post('/upload', upload.array('files'), async function(req, res, next) {
    let db = await app.get('mongoClient');
    let bucket = new mongodb.GridFSBucket(db);
    for (let file in req.files) {
      fs.createReadStream(__dirname + '/uploads/' + req.files[file].filename).
        pipe(bucket.openUploadStream(req.files[file].originalname, {
          metadata: {
            'taskId': req.body.taskId,
            'uploadedAt': Date().toString()
          }
        })).
        on('error', function(error) {
          res.status(500).json({'error': 'An error occurred uploading your file(s)'});
        }).
        on('finish', function() {
          fs.unlinkSync(req.files[file].path, (err) => {
            if (assert.ifError(err)) {
              logger.error(err);
              res.status(500).json({'error': 'An error occurred uploading your file(s)'});
            }
          });
        });
    }
    res.json({
      'status': 'success',
      'message': 'Files successfully uploaded',
      'files': (function(){
        let result = [];
        for (let file in req.files) {
          result.push(req.files[file].originalname);
        }
        return result;
      })()
    });
  });

  app.get('/upload/:name', function(req, res, next) {
    let mongoClient = app.get('mongoClient');
    mongoClient.then(db => {
      const bucket = new mongodb.GridFSBucket(db);

      bucket.openDownloadStreamByName(`${req.params.name}`).
        pipe(fs.createWriteStream(__dirname + `/uploads/${req.params.name}`)).
        on('error', function(error) {
          res.status(500).json({'error': 'An error occurred downloading your file(s)'});
        }).
        on('finish', function() {
          res.download(__dirname + `/uploads/${req.params.name}`);
        });
    });
  });

  app.delete('/upload/:name', function(req, res, next) {

  });
};
