'use client';

import { ConfigSectionForm } from '@/components/config/config-forms';
import type { ConfigSectionKey } from '@/components/config/config-sections';
import { ConfigShell } from '@/components/config/config-shell';
import type { AdapterName } from '@/types/config/channels';
import type { ToolCatalogResponse } from '@/types/config/tools';

type WebhookConfigResponse = {
  authSecretConfigured: boolean;
  baseUrl: string;
  urls: Record<AdapterName, string | null>;
};

export function ConfigSectionPage({
  section,
  initialWebhookConfig,
  initialToolCatalog,
}: {
  section: ConfigSectionKey;
  initialWebhookConfig?: WebhookConfigResponse | null;
  initialToolCatalog?: ToolCatalogResponse | null;
}) {
  return (
    <ConfigShell section={section}>
      <ConfigSectionForm
        section={section}
        initialWebhookConfig={initialWebhookConfig}
        initialToolCatalog={initialToolCatalog}
      />
    </ConfigShell>
  );
}
