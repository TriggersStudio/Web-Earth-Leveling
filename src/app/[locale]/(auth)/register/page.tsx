import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RegisterForm } from "./register-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("registerTitle"),
    description: t("registerDescription"),
  };
}

export default async function RegisterPage({
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
        <h1 className="text-2xl font-bold">{t("registerTitle")}</h1>
        <p className="text-muted-foreground">
          {t("registerSubtitle")}
        </p>
      </div>
      <RegisterForm />
      <p className="text-sm text-muted-foreground text-center">
        {t("hasAccount")}{" "}
        <Link href="/login" className="text-primary hover:underline">
          {t("logIn")}
        </Link>
      </p>
    </div>
  );
}
