import express from  'express'
import cors from 'cors'

import { OpenAI } from 'langchain/llms';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import dotenv from 'dotenv';
dotenv.config()
const apiKey = process.env.OPENAI_API_KEY
const model = new OpenAI({
    openAIApiKey :apiKey
})

// 2. Load environment variables
dotenv.config();


const answer = async(data,query)=>{

    const textsplitter =  new RecursiveCharacterTextSplitter({chunkSize:1000})

    const doc = await textsplitter.createDocuments([data])

    const vector = await HNSWLib.fromDocuments(doc, new OpenAIEmbeddings())

    const chain = RetrievalQAChain.fromLLM(model, vector.asRetriever());

    // 8. Call the RetrievalQAChain with the input question, and store the result in the 'res' variable
    const res = await chain.call({
      query: query,
    });
  
    // 9. Log the result to the console
    // console.log(res.text);
    return res
  




}











const app = express()
app.use(express.json())
app.use(cors())
const port = 3030

const query = async(text,question)=>{
    return {text, question}
}

app.get('/',(req,res)=>{
    console.log(name)
    if(req.query.name){
        name = req.query.name

    }else{
        name = 'test'
    }
    res.send(name)
})

app.post('/',async(req, res)=>{

    const{question,text} = req.body
    // console.log(text)
    // console.log(question)
    if(question && text){
        console.log(text)
       const a = await answer(text,question)
       console.log(a)
       return res.json({message:a.text})
    }
   res.json({message:'somting wong'})
    
})


app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})