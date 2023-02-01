const mongoose = require("mongoose");

// Because of warning
mongoose.set("strictQuery", true);

const mongoURI =
  // Took url of older version because of error
  "mongodb://GoFood:Jigyasha@ac-hhx1dxt-shard-00-00.3l8myyc.mongodb.net:27017,ac-hhx1dxt-shard-00-01.3l8myyc.mongodb.net:27017,ac-hhx1dxt-shard-00-02.3l8myyc.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-y0z2mm-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  // Connection to database
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) {
        console.log("...", err);
      } else {
        // To check whether connection has been established
        console.log("connected");

        // We are connecting the collection and storing its data in fetched_data
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );

        // {find} helps to find things from data fetched and toArray converts to array
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) {
              console.log("...", err);
            } else {
              // It is global variable
              // Now we can use it in other files also
              global.food_items = data;
              global.foodCategory = catData;

            }
          });
        });
      }
    }
  );
};

// We are not calling it we are exporting it
module.exports = mongoDB;
