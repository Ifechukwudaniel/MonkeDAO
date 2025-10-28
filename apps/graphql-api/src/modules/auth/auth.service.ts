import { AllConfigType } from '@/config/config.type';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@monkedeals/graphql/exceptions/validation.exception';
import { UserEntity } from '@monkedeals/postgresql-typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SignatureBytes,
  address,
  getPublicKeyFromAddress,
  getUtf8Encoder,
  isAddress,
  signatureBytes,
  verifySignature,
} from '@solana/kit';
import { Repository } from 'typeorm';
import { User } from '../user/model/user.model';
import { LoginInput, SignUpInput } from './dto/auth.dto';
import { JwtPayloadType } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signup(input: SignUpInput): Promise<User> {
    const { signature, walletAddress, name, email, username } = input;
    if (isAddress(walletAddress) == false) {
      throw new UnauthorizedException('Invalid wallet address');
    }

    const existingUser = await this.userRepository.findOne({
      where: { walletAddress },
    });

    if (existingUser) {
      throw new ValidationException(ErrorCode.E001);
    }

    // const messageText = `Sign up to MyApp by ${walletAddress}`;
    // const message = getUtf8Encoder().encode(messageText);

    // const decodedSignature = getUtf8Encoder().encode(
    //   signature,
    // ) as SignatureBytes;
    // const publickKey = await getPublicKeyFromAddress(address(walletAddress));

    // const verified = await verifySignature(
    //   publickKey,
    //   decodedSignature,
    //   message,
    // );

    // if (!verified) {
    //   throw new UnauthorizedException('Invalid wallet signature');
    // }

    const user = await this.userRepository.save({
      walletAddress,
      name,
      email,
      username,
    });

    const token = await this.createToken({ id: user.id });

    return {
      ...user,
      token,
    };
  }

  async login(input: LoginInput): Promise<User> {
    const { signature, walletAddress } = input;

    if (!isAddress(walletAddress)) {
      throw new UnauthorizedException('Invalid wallet address');
    }

    const user = await this.userRepository.findOne({
      where: { walletAddress },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // const messageText = `Login to MyApp by ${walletAddress}`;
    // const message = getUtf8Encoder().encode(messageText);

    // const decodedSignature = signatureBytes(
    //   new TextEncoder().encode(signature),
    // );
    // const publickKey = await getPublicKeyFromAddress(address(walletAddress));

    // const verified = await verifySignature(
    //   publickKey,
    //   decodedSignature,
    //   message,
    // );

    // if (!verified) {
    //   throw new UnauthorizedException('Invalid wallet signature');
    // }

    const token = await this.createToken({ id: user.id });

    return {
      ...user,
      token,
    };
  }

  async verifyAccessToken(token: string): Promise<JwtPayloadType> {
    let payload: JwtPayloadType;
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
      });
    } catch {
      throw new UnauthorizedException();
    }

    return payload;
  }

  async createToken(data: { id: number }): Promise<string> {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const accessToken = await this.jwtService.signAsync(
      {
        id: data.id,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    );

    return accessToken;
  }
}
