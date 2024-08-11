export function setGoogleApiKey(apiKey: string): void {
    process.env.GOOGLE_API_KEY = apiKey;
}

export function getGoogleApiKey(): string {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_API_KEY environment variable not set. Use `setGoogleApiKey` to configure it.");
    }
    return apiKey;
}

export function setOpenAIApiKey(apiKey: string): void {
    process.env.OPENAI_API_KEY = apiKey;
}

export function getOpenAIApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY environment variable not set. Use `setOpenAIApiKey` to configure it.");
    }
    return apiKey;
}

export function setMistralApiKey(apiKey: string): void {
    process.env.MISTRAL_API_KEY = apiKey;
}

export function getMistralApiKey(): string {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        throw new Error("MISTRAL_API_KEY environment variable not set. Use `setMistralApiKey` to configure it.");
    }
    return apiKey;
}

export function setClaudeApiKey(apiKey: string): void {
    process.env.ANTHROPIC_API_KEY = apiKey;
}

export function getClaudeApiKey(): string {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY environment variable not set. Use `setClaudeApiKey` to configure it.");
    }
    return apiKey;
}
