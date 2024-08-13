import { Mistral } from '@mistralai/mistralai';
import { CodeGenerator } from '../commonllm/CodeGenerator';

export class MistralCodeGenerator extends CodeGenerator {
    private client: Mistral;

    constructor() {
        const apiKey = process.env.MISTRAL_API_KEY;
        if (!apiKey) {
            throw new Error("MISTRAL_API_KEY is not set in the environment.");
        }
        super('Mistral');
        this.client = new Mistral({ apiKey: apiKey });
    }

    public async getModelResponse(fullPrompt: string): Promise<string> {
        const chatResponse = await this.client.chat.complete({
            model: "mistral-large-latest",
            messages: [{ role: 'user', content: fullPrompt }]
        });

        const content = chatResponse?.choices?.[0]?.message?.content;

        if (content) {
            return content;
        } else {
            throw new Error("No valid content received from Mistral.");
        }
    }
}
