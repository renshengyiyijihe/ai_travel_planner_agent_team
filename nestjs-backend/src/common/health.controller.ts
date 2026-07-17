import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class HealthController {
  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
