import { createPostMessage } from 'wiloke-react-core/utils';

export type Settings = any;

export type OnMessage = any;

export interface EmitMessage {
  '@emit_something': Settings;
}

export const pm = createPostMessage<EmitMessage, OnMessage>({
  is: 'parent',
  url: '*',
  iframeSelector: '#IFRAME',
});
