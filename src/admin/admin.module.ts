import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminGuard } from './common/guards';

@Module({
  controllers: [AdminController],
  providers: [AdminService,],
  
})
export class AdminModule {}
