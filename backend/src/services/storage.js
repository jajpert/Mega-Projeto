const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
  endpoint,
  credentials:{
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,

  }
})

const uploadImagem = async (path, buffer, mimetype) => {
  const produto_imagem = await s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: path,
    Body: buffer,
    ContentType: mimetype
  }).promise()

  return {
    url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${produto_imagem.Key}`,
    //url: produto_imagem.Location,
    path: produto_imagem.Key
  }
}

const excluirImagem = async (path) => {
  await s3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: path
  }).promise()
}

const buscarImagem = async (path) => {
  const arquivo = await s3.getObject({
    Bucket: process.env.BUCKET_NAME,
    Key: path
  }).promise();

  const files = arquivo.Contents.map((file) => {
    return {
      url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${file.Key}`,
      //url: file.Location,
      path: file.Key
    }
  })

  return files;
}


module.exports = {
  uploadImagem,
  excluirImagem,
  buscarImagem
}