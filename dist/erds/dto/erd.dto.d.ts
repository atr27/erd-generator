export declare class CreateErdDto {
    name: string;
    description?: string;
    schemaData: {
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
    };
    prompt?: string;
}
export declare class UpdateErdDto {
    name?: string;
    description?: string;
    schemaData?: CreateErdDto['schemaData'];
}
