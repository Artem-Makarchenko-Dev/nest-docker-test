export interface ReadinessStatus {
  status: 'ok' | 'error';
  checks: {
    postgres: { status: 'up' | 'down'; latencyMs?: number };
  };
  uptime: number;
  timestamp: string;
}
