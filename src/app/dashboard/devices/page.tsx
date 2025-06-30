import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/card';
import { ServerTranslatedText } from '@/components/i18n';
import { getServerT } from '@/libs/server-i18n';

export async function generateMetadata() {
  const t = await getServerT();
  return {
    title: t('devices.page.title'),
    description: t('devices.page.description'),
  };
}

export default async function DevicesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <ServerTranslatedText id="devices.heading">Devices</ServerTranslatedText>
        </h1>
        <p className="text-muted-foreground">
          <ServerTranslatedText id="devices.subheading">
            Manage your connected devices and view their status
          </ServerTranslatedText>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>
              <ServerTranslatedText id="devices.overview.title">Overview</ServerTranslatedText>
            </CardTitle>
            <CardDescription>
              <ServerTranslatedText id="devices.overview.description">
                Summary of all connected devices
              </ServerTranslatedText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <ServerTranslatedText id="devices.overview.content">
                This section will display statistics and overview information about your devices.
              </ServerTranslatedText>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <ServerTranslatedText id="devices.status.title">Status</ServerTranslatedText>
            </CardTitle>
            <CardDescription>
              <ServerTranslatedText id="devices.status.description">
                Current status of your devices
              </ServerTranslatedText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <ServerTranslatedText id="devices.status.content">
                This section will display the current status and health of your connected devices.
              </ServerTranslatedText>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <ServerTranslatedText id="devices.management.title">Management</ServerTranslatedText>
            </CardTitle>
            <CardDescription>
              <ServerTranslatedText id="devices.management.description">
                Manage and configure your devices
              </ServerTranslatedText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <ServerTranslatedText id="devices.management.content">
                This section will provide tools to manage and configure your connected devices.
              </ServerTranslatedText>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
