import React, { useState } from 'react'
import './Ai.scss'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Ai(): any {
    const [data , setData]= useState('')
    const [promt , setPromt] = useState('') 
    async function runAi(Apromt:string) {
    const MODEL_NAME = "gemini-pro";
    const API_KEY = "AIzaSyDmtGVEHxU8_L64ORRlFokiAlgZUPtPahs";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: Apromt},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    setData(response.text())
    setPromt('')
    // alert(response.text())
    }
  function EnterKey(e:any) {
    if(e.key == 'Enter'){
      runAi(promt)
    }
  }
  return (
    <div className='AI'>
      {data?         
        <Markdown>{data}</Markdown>
          :
          <div className="god">
            <img src="https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.6435-9/202226726_2845957542321402_1786322980007875441_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeHNEMwa9MzFsdD_WrlNjRHTlTST_jWEgZCVNJP-NYSBkM3n0kzQoqrye3vpgNIQEiLlgrxsSNLi_nhTCAxh_gG3&_nc_ohc=NDxSez0HrIQAX-FEc58&_nc_ht=scontent.fbkk29-8.fna&oh=00_AfDYjIUoLrFXzVZTVKS0O_robRNht4x4rbsyY3ouP_RJSQ&oe=65A4F1C5" alt="" />
            <h1>Ask God Dose</h1>
          </div>
      }
        <div className="promt">
          <input 
            type="text" 
            placeholder='Ask something' 
            onChange={(e)=> setPromt(e.target.value)}
            value={promt}
            onKeyDown={EnterKey}
          />
          <button onClick={()=>runAi(promt)}>Ask</button>
        </div>
    </div>
  )
}
