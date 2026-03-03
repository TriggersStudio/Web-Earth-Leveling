"use client";

import { useActionState } from "react";
import { register, type AuthState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const initialState: AuthState = {};

export function RegisterForm() {
  const t = useTranslations("Auth");
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardContent className="space-y-4 pt-6">
          {state.error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {state.error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")}</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                disabled={pending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")}</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                disabled={pending}
              />
            </div>
          </div>
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
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              disabled={pending}
            />
            <p className="text-xs text-muted-foreground">
              {t("minChars")}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={pending}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("createAccount")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
