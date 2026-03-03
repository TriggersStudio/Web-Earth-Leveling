import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LoginForm } from "./login-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("loginTitle"),
    description: t("loginDescription"),
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Auth" });

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{t("loginTitle")}</h1>
        <p className="text-muted-foreground">
          {t("loginSubtitle")}
        </p>
      </div>
      <LoginForm />
      <p className="text-sm text-muted-foreground text-center">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-primary hover:underline">
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
