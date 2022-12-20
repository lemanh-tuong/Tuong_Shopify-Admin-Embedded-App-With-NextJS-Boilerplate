import { Settings } from 'general/@types/FE/Settings';
import { createPostMessage } from 'wiloke-react-core/utils';

export type OnMessage = any;

export interface EmitMessage {
  '@emit_something': Settings;
}

export const pm = createPostMessage<EmitMessage, OnMessage>({
  is: 'parent',
  url: '*',
  iframeSelector: '#IFRAME',
});
