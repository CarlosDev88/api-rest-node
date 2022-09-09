const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const URL =
      "mongodb://user_bd:J0Cu8qXfVJuzzv2U@ac-jia2sq8-shard-00-00.ude0cwf.mongodb.net:27017,ac-jia2sq8-shard-00-01.ude0cwf.mongodb.net:27017,ac-jia2sq8-shard-00-02.ude0cwf.mongodb.net:27017/inventarios-app?ssl=true&replicaSet=atlas-a8jzjv-shard-0&authSource=admin&retryWrites=true&w=majority";

    await mongoose.connect(URL);

    console.log("--> conexion exitosa");
  } catch (error) {
    console.log("error-->", error);
  }
};

module.exports = {
  getConnection,
};
