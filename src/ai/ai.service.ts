import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

export interface ERDSchema {
    entities: {
        name: string;
        attributes: {
            name: string;
            type: string;
            isPrimaryKey?: boolean;
            isForeignKey?: boolean;
            references?: string;
            isNullable?: boolean;
        }[];
    }[];
    relationships: {
        from: string;
        to: string;
        type: 'one-to-one' | 'one-to-many' | 'many-to-many';
        label?: string;
    }[];
}

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

@Injectable()
export class AiService {
    private groqClient: Groq | null = null;

    private getGroqClient(): Groq {
        if (!this.groqClient) {
            this.groqClient = new Groq({
                apiKey: process.env.GROQ_API_KEY,
            });
        }
        return this.groqClient;
    }

    async generateERD(prompt: string): Promise<ERDSchema> {
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
            // Clean up the response in case it contains markdown code blocks
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

            return JSON.parse(jsonString.trim()) as ERDSchema;
        } catch (error) {
            console.error('Failed to parse AI response:', responseContent);
            throw new Error('Failed to parse ERD schema from AI response');
        }
    }
}
