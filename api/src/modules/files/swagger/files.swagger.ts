import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CompleteUploadDto } from '../dto/complete-upload.dto';
import { PresignUploadDto } from '../dto/presign-upload.dto';
import {
  DownloadUrlResponseDto,
  FileRecordResponseDto,
  FilesPaginatedResponseDto,
  PresignUploadResponseDto,
} from '../dto/file-responses.dto';
import {
  ApiErrBadRequest,
  ApiErrForbidden,
  ApiErrUnauthorized,
} from '../../../common/swagger/standard-error-responses.decorator';
import { ApiFilesPaginationQueries } from '../../../common/swagger/pagination-queries.decorator';

export function SwaggerFilesController() {
  return applyDecorators(ApiTags('Files'));
}

export function SwaggerPresign() {
  return applyDecorators(
    ApiOperation({
      summary: 'Presign upload',
      description:
        'Creates a `PENDING` file row and returns a presigned URL plus object `key` for S3-compatible upload.',
    }),
    ApiBody({ type: PresignUploadDto }),
    ApiCreatedResponse({
      description: 'Presigned URL and key',
      type: PresignUploadResponseDto,
    }),
    ApiErrUnauthorized(),
  );
}

export function SwaggerConfirm() {
  return applyDecorators(
    ApiOperation({
      summary: 'Confirm upload',
      description:
        'Verifies the object exists in storage and marks the file as `UPLOADED`.',
    }),
    ApiBody({ type: CompleteUploadDto }),
    ApiCreatedResponse({
      description: 'Updated file record',
      type: FileRecordResponseDto,
    }),
    ApiErrUnauthorized(),
    ApiErrForbidden('Key does not belong to the current user'),
    ApiErrBadRequest('Invalid status or object missing in storage'),
  );
}

export function SwaggerFindAllFiles() {
  return applyDecorators(
    ApiOperation({
      summary: 'List my files',
      description:
        'Paginated list for the authenticated user. Response: `{ data, meta }`.',
    }),
    ApiFilesPaginationQueries(),
    ApiOkResponse({
      description: 'Paginated files',
      type: FilesPaginatedResponseDto,
    }),
    ApiErrUnauthorized(),
  );
}

export function SwaggerDownloadFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get download URL',
      description: 'Returns a time-limited URL for an `UPLOADED` file you own.',
    }),
    ApiParam({ name: 'id', type: Number, description: 'File ID' }),
    ApiOkResponse({
      description: 'Presigned download URL',
      type: DownloadUrlResponseDto,
    }),
    ApiErrUnauthorized(),
    ApiErrForbidden('File not owned by user'),
    ApiErrBadRequest('File not available for download'),
  );
}

export function SwaggerDeleteFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Soft-delete file',
      description:
        'Removes the object from storage and sets status to `DELETED`.',
    }),
    ApiParam({ name: 'id', type: Number, description: 'File ID' }),
    ApiOkResponse({
      description: 'Updated file record',
      type: FileRecordResponseDto,
    }),
    ApiErrUnauthorized(),
    ApiErrForbidden('File not owned by user'),
    ApiErrBadRequest('File already deleted'),
  );
}
