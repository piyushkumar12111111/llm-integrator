import fs from 'fs';
import path from 'path';

const diagramsData: Record<string, string[]> = {};

export function extractRelevantImports(prompt: string): Record<string, string[]> {
    const relevantImports: Record<string, string[]> = {};
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

export function extractAllImports(): Record<string, string[]> {
    return diagramsData;
}

export function formatImports(relevantImports: Record<string, string[]>): string {
    const importsCode: string[] = [];
    for (const category in relevantImports) {
        const components = relevantImports[category];
        const baseModule = category.split(".").slice(0, -1).join(".");
        const className = category.split(".").pop();
        const componentsStr = components.join(", ");
        importsCode.push(`import { ${componentsStr} } from '${baseModule}';`);
    }
    return importsCode.join("\n");
}

export abstract class CodeGenerator {
    protected modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    generateDiagram(prompt: string): string {
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
        } else {
            throw new Error("No code block found in the response.");
        }
    }

    generateCode(prompt: string): string {
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
        } else {
          throw new Error("No code block found in the response.");
        }
      }

      generateText(prompt: string): string {
        const fullPrompt = `
          Please generate a detailed and relevant text-based response based on the following prompt:\n\n
          ${prompt}\n\n
        `;
    
        const response = this.getModelResponse(fullPrompt);
        const content = this.parseResponse(response);
    
        this.logText(prompt, content);
        return content;
      }

    abstract getModelResponse(fullPrompt: string): any;

    private validateImports(code: string): void {

    }

    protected logText(prompt: string, content: string): void {
        const directory = 'generated_text';
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }
    
        const logFilename = path.join(directory, `${this.modelName}_text_log.txt`);
        const logData = `
          Timestamp: ${new Date().toISOString()}
          User Prompt:
          ${prompt}
    
          Generated Text:
          ${content}
    
          ================================================================================
    
        `;
    
        fs.appendFileSync(logFilename, logData);
      }

    private logCode(prompt: string, code: string): void {
        const directory = path.join(__dirname, 'generated_code');
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const logFilename = path.join(directory, `${this.modelName}_code_log.txt`);
        const timestamp = new Date().toISOString();

        fs.appendFileSync(logFilename, `Timestamp: ${timestamp}\n`);
        fs.appendFileSync(logFilename, `User Prompt:\n${prompt}\n\n`);
        fs.appendFileSync(logFilename, `Generated Code:\n${code}\n\n`);
        fs.appendFileSync(logFilename, "=".repeat(80) + "\n\n");
    }

    private parseResponse(response: any): string {
        if ('text' in response) {
            return response.text;
        } else if ('choices' in response) {
            return response.choices[0].message.content.trim();
        } else {
            throw new Error("Unexpected response format.");
        }
    }
}
