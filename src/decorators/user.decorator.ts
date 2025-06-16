import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//custom user decorator
export const UserReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
