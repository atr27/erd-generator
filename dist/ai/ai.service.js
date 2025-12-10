"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const SYSTEM_PROMPT = `You are an expert database architect. When given a description of a database structure, you will generate an Entity-Relationship Diagram (ERD) schema in JSON format.

Your response must be a valid JSON object with the following structure:
{
  "entities": [
    {
      "name": "EntityName",
      "attributes": [
        {
          "name": "attribute_name",
          "type": "data_type",
          "isPrimaryKey": true/false,
          "isForeignKey": true/false,
          "references": "OtherEntity.attribute" (if foreign key),
          "isNullable": true/false
        }
      ]
    }
  ],
  "relationships": [
    {
      "from": "EntityName1",
      "to": "EntityName2",
      "type": "one-to-one" | "one-to-many" | "many-to-many",
      "label": "relationship description"
    }
  ]
}

Guidelines:
- Always include an id (primary key) for each entity
- Use common data types: VARCHAR, INT, BIGINT, TEXT, BOOLEAN, TIMESTAMP, DATE, DECIMAL, UUID
- Identify relationships based on the description
- Add created_at and updated_at timestamps where appropriate
- Return ONLY the JSON, no markdown or additional text`;
let AiService = class AiService {
    groqClient = null;
    getGroqClient() {
        if (!this.groqClient) {
            this.groqClient = new groq_sdk_1.default({
                apiKey: process.env.GROQ_API_KEY,
            });
        }
        return this.groqClient;
    }
    async generateERD(prompt) {
        const groq = this.getGroqClient();
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT,
                },
                {
                    role: 'user',
                    content: `Generate an ERD for the following database requirement:\n\n${prompt}`,
                },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
            max_tokens: 4096,
        });
        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) {
            throw new Error('No response from AI');
        }
        try {
            let jsonString = responseContent.trim();
            if (jsonString.startsWith('```json')) {
                jsonString = jsonString.slice(7);
            }
            if (jsonString.startsWith('```')) {
                jsonString = jsonString.slice(3);
            }
            if (jsonString.endsWith('```')) {
                jsonString = jsonString.slice(0, -3);
            }
            return JSON.parse(jsonString.trim());
        }
        catch (error) {
            console.error('Failed to parse AI response:', responseContent);
            throw new Error('Failed to parse ERD schema from AI response');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map