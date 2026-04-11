import { ConfigProvider } from '@/components/config/config-provider';

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider>{children}</ConfigProvider>;
}
