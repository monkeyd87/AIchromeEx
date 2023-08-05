// const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

 export  const openAi =  new OpenAIApi(configuration)

 
