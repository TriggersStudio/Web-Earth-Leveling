import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground">
          Entrez vos informations pour créer votre compte
        </p>
      </div>
      <RegisterForm />
      <p className="text-sm text-muted-foreground text-center">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
