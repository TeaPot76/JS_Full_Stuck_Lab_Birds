const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (banana) {

  const router = express.Router();

  router.get('/', (req, res) => {
    banana
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    banana
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // router.post('/', (req,res) => {
  //  const newData = req.body
  //  console.log("pot", newData);
  //  collection
  //  .insertOne(newData)
  //  .then(() => collection.find().toArray())
  //  .then((docs) => res.json(doc))
  //  .catch((err) => {
  //    console.error(err);
  //    res.status(500);
  //    res.json({ status: 500, error: err });
  //  });
  // })



    router.post('/', (req, res) => {
      const newData = req.body

      banana
        .insertOne(newData)
        .then(() => banana.find().toArray())
        .then((docs) => res.json(docs));
    });


  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    banana
      .deleteOne({ _id: ObjectID(id) })
      .then(() => banana.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;

};

module.exports = createRouter;
