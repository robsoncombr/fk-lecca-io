import {
  ApiKeyConnection,
  ConnectionConstructorArgs,
} from '@/apps/lib/connection';
import { InputConfig } from '@/apps/lib/input-config';

export class OpenAIApiKey extends ApiKeyConnection {
  constructor(args: ConnectionConstructorArgs) {
    super(args);
  }

  id() {
    return 'openai-connection-api-key';
  }
  name() {
    return 'API Key';
  }
  description() {
    return 'Connect using an API key';
  }
  inputConfig(): InputConfig[] {
    return [];
  }
}
