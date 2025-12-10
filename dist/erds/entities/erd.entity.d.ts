import { User } from '../../users/entities/user.entity';
export declare class Erd {
    id: string;
    name: string;
    description: string;
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
    prompt: string;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
