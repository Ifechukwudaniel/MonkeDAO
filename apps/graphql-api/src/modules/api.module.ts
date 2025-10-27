import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, TagModule],
})
export class ApiModule {}
