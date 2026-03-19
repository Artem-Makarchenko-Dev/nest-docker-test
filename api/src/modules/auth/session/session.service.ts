import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { RedisService } from '../../../redis/redis.service';

const SESSION_TTL_DAYS = 7;
const SESSION_TTL_SECONDS = SESSION_TTL_DAYS * 24 * 60 * 60;

export type SessionId = string;
export type RefreshToken = string;

export type SessionData = {
  userId: number;
  refreshToken: string;
  createdAt: number;
  rotatedAt?: number;
};

@Injectable()
export class SessionService {
  constructor(private readonly redis: RedisService) {}

  private redisKey(sessionId: SessionId) {
    return `app:session:${sessionId}`;
  }

  private sha256(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private async save(sessionId: SessionId, data: SessionData) {
    await this.redis.set(
      this.redisKey(sessionId),
      JSON.stringify(data),
      SESSION_TTL_SECONDS,
    );
  }

  private async read(sessionId: SessionId): Promise<SessionData | null> {
    const raw = await this.redis.get(this.redisKey(sessionId));
    if (!raw) return null;

    try {
      return JSON.parse(raw) as SessionData;
    } catch {
      return null;
    }
  }

  async createSession(userId: number): Promise<{
    sid: SessionId;
    refreshToken: RefreshToken;
  }> {
    const sid = randomBytes(32).toString('hex');
    const refreshToken = randomBytes(48).toString('hex');

    const data: SessionData = {
      userId,
      refreshToken: this.sha256(refreshToken),
      createdAt: Date.now(),
    };

    await this.save(sid, data);

    return { sid, refreshToken };
  }

  async findValidSession(
    sid: SessionId,
    refreshToken: RefreshToken,
  ): Promise<SessionData | null> {
    const data = await this.read(sid);
    if (!data) return null;
    if (data.refreshToken !== this.sha256(refreshToken)) return null;

    await this.save(sid, data);

    return data;
  }

  async rotateSession(
    sid: SessionId,
    refreshToken: RefreshToken,
  ): Promise<{ refreshToken: RefreshToken } | null> {
    const data = await this.read(sid);
    if (!data) return null;
    if (data.refreshToken !== this.sha256(refreshToken)) return null;

    const newRefreshToken = randomBytes(48).toString('hex');
    data.refreshToken = this.sha256(newRefreshToken);
    data.rotatedAt = Date.now();

    await this.save(sid, data);

    return { refreshToken: newRefreshToken };
  }

  async revokeSession(sid: SessionId) {
    await this.redis.del(this.redisKey(sid));
  }
}
