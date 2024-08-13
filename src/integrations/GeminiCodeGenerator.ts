import { CodeGenerator } from "../commonllm/CodeGenerator";
import { getGoogleApiKey } from "../config/apiKeys";


// export class GeminiCodeGenerator extends CodeGenerator {
//     private apiKey: string;

//     constructor() {
//         super('Gemini');
//         this.apiKey = getGoogleApiKey();
//         this.configureGoogleClient();
//     }

//     private configureGoogleClient(): void {
//         if (!this.apiKey) {
//             throw new Error('Google API Key is not set. Please set it using `setGoogleApiKey`.');
//         }
//         googleGenerativeAi.configure({ apiKey: this.apiKey });
//     }

//     protected async getModelResponse(fullPrompt: string): Promise<any> {
//         try {
//             const response = await googleGenerativeAi.generateText({
//                 model: 'text-bison-001',  // Specify the model to use
//                 prompt: fullPrompt,
//                 temperature: 0.7,  // You can adjust the temperature and other parameters
//             });
//             return response;
//         } catch (error) {
//             throw new Error(`Error generating response from Gemini: ${error.message}`);
//         }
//     }

//     public async generateGeminiSpecificFeature(prompt: string): Promise<string> {
//         // Implement any Gemini-specific functionality here.
//         const fullPrompt = `
//             This is a Gemini-specific feature.
//             Please generate a response for the following prompt:\n\n${prompt}\n\n
//         `;

//         const response = await this.getModelResponse(fullPrompt);
//         return this.parseResponse(response);
//     }

//     private parseResponse(response: any): string {
//         // Parse the response from the AI model
//         if (typeof response === 'string') {
//             return response;
//         } else if (response && typeof response === 'object') {
//             if ('text' in response) {
//                 return response.text;
//             } else if ('choices' in response && Array.isArray(response.choices)) {
//                 return response.choices[0].message?.content?.trim() || '';
//             } else if ('message' in response) {
//                 return response.message?.content?.trim() || '';
//             }
//         }
//         throw new Error('Unexpected response format.');
//     }
// }

import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiCodeGenerator extends CodeGenerator {
    public modelName: string;
    private model: any;

    constructor(modelName = 'gemini-1.5-flash') {
        super('gemini');
        this.modelName = modelName;


        const genAI = new GoogleGenerativeAI(getGoogleApiKey());


        this.model = genAI.getGenerativeModel({ model: this.modelName });
    }

    public async getModelResponse(fullPrompt: string): Promise<{ text: string }> {
        try {
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = await response.text();
            return { text: text.trim() };
        } catch (error) {
            console.error('Error generating content with Gemini:', error);
            return { text: '' };
        }
    }
}