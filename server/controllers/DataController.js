const Model = require("../models/DataModel");

//get all data by GET request at api.query in body.
module.exports.getData = async (req, res) => {
  try {
    const data = await Model.find(req.body);
    res.json(data);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

// aggrigate data by POST request. query in body in format {pipeline:<query>}

module.exports.aggrigate = async (req, res) => {
  try {
    const data = await Model.aggregate(req.body.pipeline);
    res.json(data);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

// save a data by POST request.Must have a json in body of specified model
module.exports.saveData = async (req, res) => {
  const data = new Model(req.body);
  try {
    await data.save().then((doc) => {
      res.status(201).json(doc);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// delete a data by DELETE request.Send _id of the data as parameter
module.exports.deleteData = (req, res) => {
  const { id } = req.params;

  Model.findByIdAndDelete(id)
    .then(() => {
      res.send(`data of ID:${id} deleted successfully`);
      console.log("deleted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
