import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: any) {
    const token = client.handshake.query.token;
    try {
      await this.jwtService.verify(token);
      console.log('Client connected: ', client.id);
    } catch (error) {
      throw new UnauthorizedException({ cause: error });
    }
  }
  async handleDisconnect(client: any) {
    const token = client.handshake.query.token;
    try {
      await this.jwtService.verify(token);
      console.log('Client disconnected: ', client.id);
    } catch (error) {
      throw new UnauthorizedException({ cause: error });
    }
  }
}
