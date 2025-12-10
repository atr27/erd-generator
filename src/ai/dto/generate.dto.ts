import { IsNotEmpty, MinLength } from 'class-validator';

export class GenerateErdDto {
    @IsNotEmpty()
    @MinLength(10)
    prompt: string;
}
