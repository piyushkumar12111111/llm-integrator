

// import Anthropic from '@anthropic-ai/sdk';
// import { CodeGenerator } from '../commonllm/CodeGenerator';

// export class ClaudeCodeGenerator extends CodeGenerator {
//     private anthropic: Anthropic;

//     constructor(modelName: string = 'claude-3-5-sonnet-20240620') {
//         super(modelName);
//         this.anthropic = new Anthropic();  // Initialize the Anthropic SDK
//     }

//     public getModelResponse(fullPrompt: string): any {
//         return this.anthropic.messages.create({
//             model: this.modelName,
//             max_tokens: 1024,
//             messages: [
//                 {"role": "user", "content": fullPrompt}
//             ]
//         }).then((response: any) => {
//             return response;
//         }).catch((error: any) => {
//             throw new Error(`Error generating response from Claude: ${error.message}`);
//         });
//     }

// }



import Anthropic from '@anthropic-ai/sdk';
import { CodeGenerator } from '../commonllm/CodeGenerator';
import { getClaudeApiKey, setClaudeApiKey } from '../config/apiKeys';




export class ClaudeCodeGenerator extends CodeGenerator {
    private anthropic: Anthropic;

    constructor(apiKey: string = '', modelName: string = 'claude-3-5-sonnet-20240620') {
        super(modelName);

        if (apiKey) {
            setClaudeApiKey(apiKey);
        }

        const claudeApiKey = getClaudeApiKey();
        this.anthropic = new Anthropic({
            apiKey: claudeApiKey 
        });
    }

    public getModelResponse(fullPrompt: string): any {
        return this.anthropic.messages.create({
            model: this.modelName,
            max_tokens: 1024,
            messages: [
                {"role": "user", "content": fullPrompt}
            ]
        }).then((response: any) => {
            return response;
        }).catch((error: any) => {
            throw new Error(`Error generating response from Claude: ${error.message}`);
        });
    }


}
