import { AuthGuard } from '@nestjs/passport';

export class JwtGuardRefresh extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
