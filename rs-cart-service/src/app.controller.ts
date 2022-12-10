import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, JwtAuthGuard, BasicAuthGuard } from './auth';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get([ '', 'ping' ])
  healthCheck(): any {
    console.log('AppController healthCheck');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  //@UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    console.log('AppController login');
    const token = this.authService.login(req.user, 'basic');

    return  {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  //@UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    console.log('AppController getProfile');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: 'Default user',
      },
    };
  }
}
