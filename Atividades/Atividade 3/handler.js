'use strict';

const axios = require('axios')
const aws = require('aws-sdk')
const db = new aws.DynamoDB.DocumentClient({region: 'us-east-1'})

const dynamo = {
    put: async data => {
        const params = {
            TableName: 'contatos',
            Item: data
        }
        const response = await db.put(params).promise()
        return response
    },

    get: async keys => {
        const params = {
            TableName: 'contatos',
            Key: keys
        }

        const i = await db.get(params).promise()
        return x.Item
    }

}

module.exports.contacts = async () => {

    const response = await axios.get('https://8klio9atoh.execute-api.us-west-2.amazonaws.com/default/Contatos')
    const result = response.data

    for (let i = 0; i < result.contatos.length; i++){
        const contato = result.contatos[i]
        await dynamo.put(contato)
    }

  return {
    statusCode: 200,
    body: JSON.stringify( { result })
  };
};
