import { IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateErdDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsObject()
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

    @IsOptional()
    prompt?: string;
}

export class UpdateErdDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsObject()
    schemaData?: CreateErdDto['schemaData'];
}
