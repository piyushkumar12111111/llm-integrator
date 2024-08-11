
import { CodeGenerator } from '../commonllm/CodeGenerator';

import axios from 'axios';
import { getGoogleApiKey } from '../config/apiKeys';

export class GeminiCodeGenerator extends CodeGenerator {
    constructor(modelName = 'gemini-1.5-pro') {
        super('gemini');
        this.modelName = modelName;
        this.configureApiKey();
    }

    private configureApiKey(): void {
        const apiKey = getGoogleApiKey();
        axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    }

    getModelResponse(fullPrompt: string): any {
        return axios.post(`https://api.google.com/generative-ai/${this.modelName}/generate`, {
            prompt: fullPrompt
        }).then(response => {
            return { text: response.data.text.trim() };
        }).catch(error => {
            throw new Error(`Error fetching response from Gemini: ${error.message}`);
        });
    }
}
