import { Injectable } from '@angular/core';




var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable()
export class WebSocketServiceService {

  constructor() { }
  public connect() {
    let socket = new SockJs(`http://localhost:8082/Banque/socket`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
