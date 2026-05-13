import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "CADASTRE A SUA ;)"; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ 
  model: "CADASTRE A SUA ;)", 
  systemInstruction: "CADASTRE A SUA ;)"
});