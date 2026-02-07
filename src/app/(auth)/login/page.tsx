import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>
      <LoginForm />
      <p className="text-sm text-muted-foreground text-center">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-primary hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}
