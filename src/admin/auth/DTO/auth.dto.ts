import { IsEmail,IsEnum,IsInt,IsNotEmpty, Length, isString} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
}
export class LoginDTO {

  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail({},{message:"Email is invalid"})
  email: string;

  @IsNotEmpty({message:'Password is Empty'})
  password: string
}

export class signUpDTO{

  @IsNotEmpty({message:'Name is Empty'})
  name:string

  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail({},{message:"Email is invalid"})
  email: string;

  @IsNotEmpty({ message: 'Password is empty' })
  @Length(8,20,{message: "Password must be 8 characters long"})
  password: string

  @IsNotEmpty({ message: 'Gender field is empty' })
  @IsEnum(Gender, { message: 'Invalid gender value' })
  gender:string
  

  @IsNotEmpty({ message: 'Number field is empty' })
  @Length(10,10,{message: "Number must have 10 Digits"})
  number:string


}

