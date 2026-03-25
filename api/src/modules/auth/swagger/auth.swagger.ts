import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import {
  LoginResponseDto,
  LogoutResponseDto,
  MeResponseDto,
  RefreshResponseDto,
  SignupResponseDto,
} from '../dto/auth-responses.dto';
import {
  ApiErrBadRequest,
  ApiErrConflict,
  ApiErrUnauthorized,
} from '../../../common/swagger/standard-error-responses.decorator';

export function SwaggerSignup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign up',
      description: 'Create a local account with email and password.',
    }),
    ApiBody({ type: SignupDto }),
    ApiCreatedResponse({
      description: 'User created',
      type: SignupResponseDto,
    }),
    ApiErrBadRequest('Validation failed or missing email/password'),
    ApiErrConflict('Email already registered'),
  );
}

export function SwaggerLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Log in',
      description:
        'Login with email and password. Returns `accessToken` and sets HttpOnly session cookies (`sid`, `refresh`).',
    }),
    ApiBody({ type: LoginDto }),
    ApiOkResponse({
      description: 'Authenticated; cookies set',
      type: LoginResponseDto,
    }),
    ApiErrBadRequest('Missing email or password'),
    ApiErrUnauthorized('Invalid credentials'),
  );
}

export function SwaggerLogout() {
  return applyDecorators(
    ApiOperation({
      summary: 'Log out',
      description:
        'Revokes the server session when `sid` is present and clears auth cookies. Send Bearer JWT if the client uses it.',
    }),
    ApiOkResponse({
      description: 'Logged out',
      type: LogoutResponseDto,
    }),
    ApiErrUnauthorized(),
  );
}

export function SwaggerRefresh() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh access token',
      description:
        'Uses HttpOnly cookies (`sid`, `refresh`). Returns a new `accessToken` and rotates the refresh cookie. Authorize with the **refresh** cookie scheme in Swagger UI.',
    }),
    ApiOkResponse({
      description: 'New access token issued',
      type: RefreshResponseDto,
    }),
    ApiErrUnauthorized('Missing, invalid, or expired session'),
  );
}

export function SwaggerMe() {
  return applyDecorators(
    ApiOperation({
      summary: 'Current user',
      description:
        'Returns the authenticated user and permission codes. Use `Authorization: Bearer` (cross-origin SPAs often rely on this instead of cookies).',
    }),
    ApiOkResponse({
      description: 'Authenticated user with permissions',
      type: MeResponseDto,
    }),
    ApiErrUnauthorized(),
  );
}

export function SwaggerGoogleStart() {
  return applyDecorators(
    ApiOperation({
      summary: 'Google OAuth — start',
      description:
        'Redirects the browser to Google. Use a top-level navigation, not XHR.',
    }),
    ApiResponse({ status: 302, description: 'Redirect to Google OAuth' }),
  );
}

export function SwaggerGoogleCallback() {
  return applyDecorators(
    ApiOperation({
      summary: 'Google OAuth — callback',
      description:
        'Handles Google redirect, sets session cookies, then redirects to the web app with tokens in the query string.',
    }),
    ApiResponse({
      status: 302,
      description: 'Redirect to frontend with access token in query',
    }),
    ApiErrUnauthorized('OAuth failed or email missing from profile'),
  );
}
