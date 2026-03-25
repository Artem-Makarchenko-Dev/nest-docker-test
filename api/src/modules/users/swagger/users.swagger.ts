import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserDeletedResponseDto,
  UserDetailResponseDto,
  UsersPaginatedResponseDto,
} from '../dto/user-responses.dto';
import {
  ApiErrorsAuthenticatedList,
  ApiErrorsAuthenticatedRead,
} from '../../../common/swagger/standard-error-responses.decorator';
import { ApiUsersPaginationQueries } from '../../../common/swagger/pagination-queries.decorator';

export function SwaggerUsersController() {
  return applyDecorators(ApiTags('Users'));
}

export function SwaggerFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'List users',
      description:
        'Paginated directory with optional filters. Requires `users.read`. Response: `{ data, meta }` (meta has `total`, `page`, `limit`, page flags).',
    }),
    ApiUsersPaginationQueries(),
    ApiOkResponse({
      description: 'Paginated users',
      type: UsersPaginatedResponseDto,
    }),
    ApiErrorsAuthenticatedList(),
  );
}

export function SwaggerFindOneUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by ID',
      description: 'Requires `users.read`.',
    }),
    ApiParam({ name: 'id', type: Number, description: 'User ID' }),
    ApiOkResponse({
      description: 'User with role details',
      type: UserDetailResponseDto,
    }),
    ApiErrorsAuthenticatedRead(),
  );
}

export function SwaggerDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
      description:
        'Hard delete. Requires `users.delete`. Response mirrors safe user fields (password hash is not part of this schema).',
    }),
    ApiParam({ name: 'id', type: Number, description: 'User ID' }),
    ApiOkResponse({
      description: 'Deleted user (documented fields only)',
      type: UserDeletedResponseDto,
    }),
    ApiErrorsAuthenticatedRead(),
  );
}
