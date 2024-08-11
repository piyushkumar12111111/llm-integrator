"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
exports.extractRelevantImports = extractRelevantImports;
exports.extractAllImports = extractAllImports;
exports.formatImports = formatImports;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const diagramsData = {};
function extractRelevantImports(prompt) {
    const relevantImports = {};
    for (const category in diagramsData) {
        const components = diagramsData[category];
        for (const component of components) {
            if (prompt.toLowerCase().includes(component.toLowerCase())) {
                if (!relevantImports[category]) {
                    relevantImports[category] = [];
                }
                relevantImports[category].push(component);
            }
        }
    }
    return relevantImports;
}
function extractAllImports() {
    return diagramsData;
}
function formatImports(relevantImports) {
    const importsCode = [];
    for (const category in relevantImports) {
        const components = relevantImports[category];
        const baseModule = category.split(".").slice(0, -1).join(".");
        const className = category.split(".").pop();
        const componentsStr = components.join(", ");
        importsCode.push(`import { ${componentsStr} } from '${baseModule}';`);
    }
    return importsCode.join("\n");
}
class CodeGenerator {
    constructor(modelName) {
        this.modelName = modelName;
    }
    generateDiagram(prompt) {
        const relevantImports = extractRelevantImports(prompt);
        const formattedImports = formatImports(relevantImports);
        const fullPrompt = `Generate a complete TypeScript script using the diagrams package to create a system diagram. 
                            The script should only use the following imports:\n\n${formattedImports}.
                            Ensure the output image is always saved as 'diagram_output'. 
                            Only return the complete TypeScript code wrapped in triple backticks.\n\n
                            User prompt: ${prompt}`;
        const response = this.getModelResponse(fullPrompt);
        const content = this.parseResponse(response);
        const codeMatch = content.match(/```(?:typescript)?([\s\S]*?)```/);
        if (codeMatch) {
            const code = codeMatch[1].trim();
            this.validateImports(code);
            this.logCode(prompt, code);
            return code;
        }
        else {
            throw new Error("No code block found in the response.");
        }
    }
    generateCode(prompt) {
        const fullPrompt = `
          Generate a complete and valid code snippet based on the following prompt:\n\n
          ${prompt}\n\n
          Ensure the code is syntactically correct and complete, wrapped in triple backticks.
        `;
        const response = this.getModelResponse(fullPrompt);
        const content = this.parseResponse(response);
        const codeMatch = content.match(/```(?:typescript)?([\s\S]*?)```/);
        if (codeMatch) {
            return codeMatch[1].trim();
        }
        else {
            throw new Error("No code block found in the response.");
        }
    }
    generateText(prompt) {
        const fullPrompt = `
          Please generate a detailed and relevant text-based response based on the following prompt:\n\n
          ${prompt}\n\n
        `;
        const response = this.getModelResponse(fullPrompt);
        const content = this.parseResponse(response);
        this.logText(prompt, content);
        return content;
    }
    validateImports(code) {
        // Add validation logic if needed
    }
    logText(prompt, content) {
        const directory = 'generated_text';
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory);
        }
        const logFilename = path_1.default.join(directory, `${this.modelName}_text_log.txt`);
        const logData = `
          Timestamp: ${new Date().toISOString()}
          User Prompt:
          ${prompt}
    
          Generated Text:
          ${content}
    
          ================================================================================
    
        `;
        fs_1.default.appendFileSync(logFilename, logData);
    }
    logCode(prompt, code) {
        const directory = path_1.default.join(__dirname, 'generated_code');
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory);
        }
        const logFilename = path_1.default.join(directory, `${this.modelName}_code_log.txt`);
        const timestamp = new Date().toISOString();
        fs_1.default.appendFileSync(logFilename, `Timestamp: ${timestamp}\n`);
        fs_1.default.appendFileSync(logFilename, `User Prompt:\n${prompt}\n\n`);
        fs_1.default.appendFileSync(logFilename, `Generated Code:\n${code}\n\n`);
        fs_1.default.appendFileSync(logFilename, "=".repeat(80) + "\n\n");
    }
    parseResponse(response) {
        if ('text' in response) {
            return response.text;
        }
        else if ('choices' in response) {
            return response.choices[0].message.content.trim();
        }
        else {
            throw new Error("Unexpected response format.");
        }
    }
}
exports.CodeGenerator = CodeGenerator;
