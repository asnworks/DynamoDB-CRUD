'use strict';

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();


module.exports.hello = async event => {
  let table = "ArtistsTable";

  let ArtistId = "4";
  let Concert = "Spain";

  let params = {
    TableName: table,
    Item: {
      "ArtistId": ArtistId,
      "Concert": Concert,
      "Artist": "Enric iglesias",
      "Year": "2018",
    }
  };

  console.log("Adding a new item...");
  try {
    let result = await docClient.put(params).promise();
    if(result){
      console.log("Data successfully inserted. ", result)
      return {
        body: JSON.stringify(
          {
            message: "Data successfully inserted",
            data: params
          }
        )
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports.getItemById = async event => {
  const table = "ArtistsTable";
  let ArtistId = "1"
  let Concert = "RiverPlate"

  let params = {
    TableName: table,
    Key: {
      "ArtistId": ArtistId,
      "Concert": Concert
    }
  }

  console.log("Reading an item...");
  try {
    let result = await docClient.get(params).promise();
    if(result){
      console.log("The output data is ", result)
      return{
        body: JSON.stringify({
          message: "Data read successful",
          data: JSON.stringify(result)
        })
      }
    }
  } catch (error) {
    return error;
  }
}

module.exports.getItems = async event => {
  const table = "ArtistsTable";

  let params = {
    TableName: table,
    Select: "ALL_ATTRIBUTES"

  }

  try {
    let result = await docClient.scan(params).promise();
    if(result){
      console.log("The output data is ", result);
      return {
        body: JSON.stringify({
          message: "Get All data successful",
          data: result
        })
      }
    }
  } catch (error) {
    return error
  }
}

module.exports.updateItem = async event => {
  const table = "ArtistsTable";
  const ArtistId = "1"
  const Concert = "RiverPlate"
  let params = {
    TableName: table,
    Key: {
      "ArtistId": ArtistId,
      "Concert": Concert
    },
    UpdateExpression: "set Artist = :y",
    ExpressionAttributeValues: {
      ":y": "AC/DC"
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    console.log("Updating the item...");
    let result = await docClient.update(params).promise();
    if (result){
      console.log(result);
      return {
        body: JSON.stringify({
          message: "Data successfully updated",
          data: result
        })
      }
    }
  } catch (error) {
    return error;
  }
}

module.exports.deleteItem = async event => {
  let table = "ArtistsTable"
  let Concert = "Spain"
  let ArtistId = "4"

  let params = {
    TableName: table,
    Key: {
      "ArtistId": ArtistId,
      "Concert": Concert
    }
  }

  try {
    console.log("Deleting the item...")
    let result = await docClient.delete(params).promise();
    if (result) {
      console.log(result);
      return {
        body: JSON.stringify({
          message: "Item Deleted successfully"
        })
      }
    }
  } catch (e) {
    return e;
  }
}