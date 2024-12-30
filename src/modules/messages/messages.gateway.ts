import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway
  implements
    OnModuleInit,
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

  async afterInit(server: Server) {
    console.log('WebSocket server initialized', server);
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    //     try {
    //       const token = client.handshake.auth.token;
    //
    //       if (!token) {
    //         throw new UnauthorizedException('No token provided');
    //       }
    //
    //       const accessToken = await this.authService.getAccessToken();
    //
    //       const user = await this.jwtService.verifyAsync(token, {
    //         secret: accessToken,
    //       });
    //
    //       client.data.user = user;
    //
    //       console.log('user', user);
    //     } catch (error) {
    //       client.disconnect();
    //       console.error('Connection refused: Invalid token', error.message);
    //     }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() messageDto: MessageDto) {
    this.server.emit('message', messageDto);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    client.join(data.roomId);
    console.log(`User ${data.userId} joined room: ${data.roomId}`);
  }

  // Handle private messages
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() data: { roomId: string; senderId: string; message: string },
  ) {
    console.log(
      `Message in room ${data.roomId} from ${data.senderId}: ${data.message}`,
    );
    this.server.to(data.roomId).emit('privateMessage', {
      senderId: data.senderId,
      message: data.message,
    });
  }
}
