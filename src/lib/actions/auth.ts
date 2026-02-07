"use server";

import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, logout as logoutSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };

  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return { error: firstError?.message || "Données invalides" };
  }

  const { email, password, firstName, lastName } = result.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Un compte existe déjà avec cet email" };
  }

  const passwordHash = await hashPassword(password);

  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
    },
  });

  await createSession(user.id);

  redirect("/dashboard");
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return { error: firstError?.message || "Données invalides" };
  }

  const { email, password } = result.data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    return { error: "Email ou mot de passe incorrect" };
  }

  const validPassword = await verifyPassword(user.passwordHash, password);

  if (!validPassword) {
    return { error: "Email ou mot de passe incorrect" };
  }

  await createSession(user.id);

  redirect("/dashboard");
}

export async function logout() {
  await logoutSession();
  redirect("/");
}
