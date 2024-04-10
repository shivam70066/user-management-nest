import { RoleSlug } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, Length } from "class-validator";
enum Gender {
  Male = 'male',
  Female = 'female',
}
export class dataDTO {

  @IsNotEmpty({ message: 'Name is Empty' })
  name: string

  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail({}, { message: "Email is invalid" })
  email: string;

  @IsNotEmpty({ message: 'Password is empty' })
  @Length(8, 20, { message: "Password must be 8 characters long" })
  password: string

  @IsNotEmpty({ message: 'Gender field is empty' })
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender: string


  @IsNotEmpty({ message: 'Number field is empty' })
  @Length(10, 10, { message: "Number must have 10 Digits" })
  number: number

  @IsInt({ message: 'ID field is empty' })
  roleID: number


}

export class userDetails {

  @IsNotEmpty({ message: 'Number field is empty' })
  @Length(10, 10, { message: "Number must have 10 Digits" })
  number: number

  @IsNotEmpty({ message: 'Gender field is empty' })
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender: string

  @IsNotEmpty({ message: 'Password is empty' })
  @Length(8, 20, { message: "Password must be 8 characters long" })
  password: string

  @IsNotEmpty({ message: 'Email is empty' })
  email: string;

  @IsNotEmpty({ message: 'Name is Empty' })
  name: string

  @IsNotEmpty({ message: "Role slug is empty" })
  role_slug: RoleSlug
}