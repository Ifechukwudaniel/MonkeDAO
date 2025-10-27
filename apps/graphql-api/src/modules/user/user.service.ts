import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@monkedeals/graphql';
import { UserEntity } from '@monkedeals/postgresql-typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UpdateUserInput } from './dto/user.dto';
import { User } from './model/user.model';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(currentUser: { id: number; token: string }): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({
      id: currentUser.id,
    });

    return { ...user, token: currentUser.token };
  }

  async update(userId: number, input: UpdateUserInput) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new ValidationException(ErrorCode.E002);
    }

    const savedUser = await this.userRepository.save({
      id: userId,
      ...input,
    });

    return {
      ...user,
      ...savedUser,
    };
  }
}
