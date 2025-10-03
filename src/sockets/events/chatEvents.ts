import type { Socket } from "socket.io-client";
import type { IClientEventHandler ,TypedSocket} from "../socketmanager";
import type { AppInbound, AppOutbound,ChatInbound } from "./";

type ChatMessage = Parameters<AppInbound["chat:message"]>[0];

export class ChatEvents implements IClientEventHandler<AppInbound, AppOutbound> {
  private socket?: TypedSocket<AppInbound, AppOutbound>;
  private onMessageListener?: (m: ChatMessage) => void;

  constructor(private onMessage: (m: ChatMessage) => void) {}

  register({ socket }: { socket: TypedSocket<AppInbound, AppOutbound> }) {
    this.socket = socket;
    if (!this.onMessageListener) this.onMessageListener = (m) => this.onMessage(m);
    socket.on("chat:message", this.onMessageListener);
  }

  dispose() {
    if (!this.socket) return;
    if (this.onMessageListener) this.socket.off("chat:message", this.onMessageListener);
    this.socket = undefined;
  }
}