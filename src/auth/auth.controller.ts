import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { RequestCodeDto } from './dto/request-code.dto';
import { RequestAdminCodeDto } from './dto/request-admin-code.dto';
import { LoginDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('confirm-registration')
  @ApiOperation({ summary: 'Confirm user registration with code' })
  @ApiResponse({ status: 200, description: 'User registration confirmed.' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code.' })
  async confirmRegistration(@Body() confirmRegistrationDto: ConfirmCodeDto) {
    return this.authService.confirmRegistration(confirmRegistrationDto);
  }

  @Post('request-code')
  @ApiOperation({ summary: 'Request a verification code for registration' })
  @ApiResponse({ status: 200, description: 'Code sent successfully.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  async requestCode(@Body() requestCodeDto: RequestCodeDto) {
    return this.authService.requestCode(requestCodeDto);
  }

  @Post('request-admin-code')
  @ApiOperation({
    summary: 'Request a verification code for admin with password',
  })
  @ApiResponse({ status: 200, description: 'Code sent successfully.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Invalid password or not admin.' })
  async requestAdminCode(@Body() requestAdminCodeDto: RequestAdminCodeDto) {
    return this.authService.requestAdminCode(requestAdminCodeDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
