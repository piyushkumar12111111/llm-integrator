"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGoogleApiKey = setGoogleApiKey;
exports.getGoogleApiKey = getGoogleApiKey;
exports.setOpenAIApiKey = setOpenAIApiKey;
exports.getOpenAIApiKey = getOpenAIApiKey;
exports.setMistralApiKey = setMistralApiKey;
exports.getMistralApiKey = getMistralApiKey;
exports.setClaudeApiKey = setClaudeApiKey;
exports.getClaudeApiKey = getClaudeApiKey;
function setGoogleApiKey(apiKey) {
    process.env.GOOGLE_API_KEY = apiKey;
}
function getGoogleApiKey() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_API_KEY environment variable not set. Use `setGoogleApiKey` to configure it.");
    }
    return apiKey;
}
function setOpenAIApiKey(apiKey) {
    process.env.OPENAI_API_KEY = apiKey;
}
function getOpenAIApiKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY environment variable not set. Use `setOpenAIApiKey` to configure it.");
    }
    return apiKey;
}
function setMistralApiKey(apiKey) {
    process.env.MISTRAL_API_KEY = apiKey;
}
function getMistralApiKey() {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        throw new Error("MISTRAL_API_KEY environment variable not set. Use `setMistralApiKey` to configure it.");
    }
    return apiKey;
}
function setClaudeApiKey(apiKey) {
    process.env.ANTHROPIC_API_KEY = apiKey;
}
function getClaudeApiKey() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY environment variable not set. Use `setClaudeApiKey` to configure it.");
    }
    return apiKey;
}
