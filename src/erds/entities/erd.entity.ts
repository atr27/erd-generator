import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('erds')
export class Erd {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Column({ type: 'jsonb' })
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

    @Column({ nullable: true, type: 'text' })
    prompt: string;

    @Column('uuid')
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
