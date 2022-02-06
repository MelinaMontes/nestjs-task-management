import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string;

  //Passwords will contain at least 1 upper case letter
  //Passwords will contain at least 1 lower case letter
  //Passwords will contain at least 1 number or special character

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:  'Your password is too weak! Try again', 
    })
    password: string;


}