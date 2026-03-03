"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const initialState: AuthState = {};

export function LoginForm() {
  const t = useTranslations("Auth");
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardContent className="space-y-4 pt-6">
          {state.error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="exemple@email.com"
              required
              disabled={pending}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={pending}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("loginButton")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
