import { SignupDto } from '../../auth/dto';

export class CreateUserDto extends SignupDto {
  ip: string;
}
