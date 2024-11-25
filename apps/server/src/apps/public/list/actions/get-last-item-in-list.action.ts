import {
  Action,
  RunActionArgs,
  ActionConstructorArgs,
} from '@/apps/lib/action';
import { InputConfig } from '@/apps/lib/input-config';
import { z } from 'zod';
import { NodeViewOptions } from '@/apps/lib/trigger';
import { List } from '../list.app';
import { ServerConfig } from '@/config/server.config';

export class GetLastItemInList extends Action {
  constructor(args: ActionConstructorArgs) {
    super(args);
  }

  app: List;

  id() {
    return 'list_action_get-last-item';
  }

  name() {
    return 'Get Last Item in List';
  }

  iconUrl(): null | string {
    return `${ServerConfig.INTEGRATION_ICON_BASE_URL}/apps/${this.app.id}.svg`;
  }

  needsConnection(): boolean {
    return false;
  }

  description() {
    return 'Gets the last item from a list of values';
  }

  viewOptions(): null | NodeViewOptions {
    return {
      saveButtonOptions: {
        replaceSaveAndTestButton: {
          label: 'Save & Test',
          type: 'real',
        },
      },
    };
  }

  aiSchema() {
    return z.object({
      listOfItems: z
        .array(z.any())
        .describe('The list of items from which to get the last item'),
    });
  }

  inputConfig(): InputConfig[] {
    return [
      {
        id: 'listOfItems',
        label: 'List',
        description:
          'Provide a list of items, and this action will return the last item.',
        inputType: 'text',
        required: {
          missingMessage: 'List is required',
          missingStatus: 'warning',
        },
      },
    ];
  }

  async run({ configValue }: RunActionArgs<ConfigValue>): Promise<Response> {
    const { listOfItems } = configValue;

    let list;
    // Validate and parse each item in listOfListItems
    if (typeof listOfItems === 'string') {
      list = this.app.parseJsonArrayOrValue(listOfItems);
      if (!Array.isArray(list)) {
        throw new Error('List must be a valid JSON array');
      }
    } else if (Array.isArray(listOfItems)) {
      list = listOfItems;
    } else {
      throw new Error(
        'List must be a valid stringified JSON array or an array of values',
      );
    }

    // Get the last item in the list
    const lastItem = list[list.length - 1] ?? null;

    return { result: lastItem };
  }

  async mockRun(): Promise<unknown> {
    return { result: 'last-item' };
  }
}

type ConfigValue = z.infer<ReturnType<GetLastItemInList['aiSchema']>>;

type Response = {
  result: unknown;
};
