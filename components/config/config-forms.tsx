'use client';

import type { ConfigSectionKey } from '@/components/config/config-sections';
import type { AdapterName } from '@/types/config/channels';
import type { ToolCatalogResponse } from '@/types/config/tools';
import { AgentsForm } from './forms/agents-form';
import { AutonomyForm } from './forms/autonomy-form';
import { ChannelsForm } from './forms/channels-form';
import { McpForm } from './forms/mcp-form';
import { ModelsForm } from './forms/models/models-form';
import { ToolsForm } from './forms/tools-form';

type WebhookConfigResponse = {
  authSecretConfigured: boolean;
  baseUrl: string;
  urls: Record<AdapterName, string | null>;
};

export function ConfigSectionForm({
  section,
  initialWebhookConfig,
  initialToolCatalog,
}: {
  section: ConfigSectionKey;
  initialWebhookConfig?: WebhookConfigResponse | null;
  initialToolCatalog?: ToolCatalogResponse | null;
}) {
  switch (section) {
    case 'models':
      return <ModelsForm />;
    case 'agents':
      return <AgentsForm />;
    case 'channels':
      return <ChannelsForm initialWebhookConfig={initialWebhookConfig} />;
    case 'autonomy':
      return <AutonomyForm />;
    case 'tools':
      return <ToolsForm initialCatalog={initialToolCatalog} />;
    case 'mcp':
      return <McpForm />;
    default:
      return null;
  }
}
