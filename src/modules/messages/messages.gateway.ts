import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {
    console.log('MessagesGateway initialized');
  }

  async onModuleDestroy() {
    console.log('MessagesGateway destroyed');
  }

  async afterInit(server: Server) {
    console.log('WebSocket server initialized', server);
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() messageDto: MessageDto) {
    this.server.emit('sendMessage', messageDto);
  }
}
