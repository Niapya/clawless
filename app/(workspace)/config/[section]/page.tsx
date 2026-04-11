import { notFound } from 'next/navigation';

import { ConfigSectionPage } from '@/components/config/config-section-page';
import { isConfigSectionKey } from '@/components/config/config-sections';
import {
  getAppBaseUrl,
  getBotAuthSecret,
  getWebhookCallbackUrl,
} from '@/lib/bot/webhook';
import { getConfig } from '@/lib/core/kv/config';
import { getBuildInToolCatalog } from '@/lib/workflow/agent/tools';
import { ADAPTER_NAMES, type AdapterName } from '@/types/config/channels';
import {
  type ToolCatalogResponse,
  toolCatalogResponseSchema,
} from '@/types/config/tools';

type WebhookConfigResponse = {
  authSecretConfigured: boolean;
  baseUrl: string;
  urls: Record<AdapterName, string | null>;
};

export default async function ConfigSectionRoute({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isConfigSectionKey(section)) {
    notFound();
  }

  let initialWebhookConfig: WebhookConfigResponse | null = null;
  let initialToolCatalog: ToolCatalogResponse | null = null;

  if (section === 'channels') {
    const urls = Object.fromEntries(
      ADAPTER_NAMES.map((adapter) => [adapter, getWebhookCallbackUrl(adapter)]),
    ) as Record<AdapterName, string | null>;

    initialWebhookConfig = {
      authSecretConfigured: Boolean(getBotAuthSecret()),
      baseUrl: getAppBaseUrl(),
      urls,
    };
  }

  if (section === 'tools') {
    const config = await getConfig();
    initialToolCatalog = toolCatalogResponseSchema.parse(
      getBuildInToolCatalog(config),
    );
  }

  return (
    <ConfigSectionPage
      section={section}
      initialWebhookConfig={initialWebhookConfig}
      initialToolCatalog={initialToolCatalog}
    />
  );
}
