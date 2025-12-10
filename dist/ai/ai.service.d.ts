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
export declare class AiService {
    private groqClient;
    private getGroqClient;
    generateERD(prompt: string): Promise<ERDSchema>;
}
