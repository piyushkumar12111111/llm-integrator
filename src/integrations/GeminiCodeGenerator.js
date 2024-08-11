"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiCodeGenerator = void 0;
const CodeGenerator_1 = require("../commonllm/CodeGenerator");
const axios_1 = __importDefault(require("axios"));
const apiKeys_1 = require("../config/apiKeys");
class GeminiCodeGenerator extends CodeGenerator_1.CodeGenerator {
    constructor(modelName = 'gemini-1.5-pro') {
        super('gemini');
        this.modelName = modelName;
        this.configureApiKey();
    }
    configureApiKey() {
        const apiKey = (0, apiKeys_1.getGoogleApiKey)();
        axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    }
    getModelResponse(fullPrompt) {
        return axios_1.default.post(`https://api.google.com/generative-ai/${this.modelName}/generate`, {
            prompt: fullPrompt
        }).then(response => {
            return { text: response.data.text.trim() };
        }).catch(error => {
            throw new Error(`Error fetching response from Gemini: ${error.message}`);
        });
    }
}
exports.GeminiCodeGenerator = GeminiCodeGenerator;
