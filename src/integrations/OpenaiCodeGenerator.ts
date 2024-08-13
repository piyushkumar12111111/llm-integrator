// src/openaiCodeGenerator.ts
import { CodeGenerator } from '../commonllm/CodeGenerator';
import OpenAI from 'openai';

export class OpenaiCodeGenerator extends CodeGenerator {
    private openai: OpenAI;

    constructor(apiKey: string, modelName: string) {
        super(modelName);
        this.openai = new OpenAI({
            apiKey: apiKey,
        });
    }

    async getModelResponse(fullPrompt: string): Promise<any> {
        try {
            const response = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: fullPrompt }],
                model: 'gpt-4o-mini',
            });
            return response.choices[0].message?.content?.trim() || '';
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            throw error;
        }
    }


}
