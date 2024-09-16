import { Transform } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "enums/roles.enum";

export class CreateUserDto {
  @Transform(({value})=> value.trim())
  @IsString()
  name?: string;

  @Transform(({value})=> value.trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({value})=> value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  roles: Role[];
}
