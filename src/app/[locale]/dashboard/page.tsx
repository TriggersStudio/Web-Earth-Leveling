import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("dashboardTitle"),
    description: t("dashboardDescription"),
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = user.username || user.email;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {t("hello", { name: displayName })}
        </h1>
        <p className="text-muted-foreground">
          {t("welcome")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("profile")}</CardTitle>
            <CardDescription>{t("personalInfo")}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">{t("emailLabel")}</dt>
                <dd>{user.email}</dd>
              </div>
              {user.username && (
                <div>
                  <dt className="text-muted-foreground">{t("username")}</dt>
                  <dd>{user.username}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
            <CardDescription>{t("lastActions")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("noActivity")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("statistics")}</CardTitle>
            <CardDescription>{t("dataOverview")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("statsComingSoon")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
