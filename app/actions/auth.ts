"use server";

import argon2 from "argon2";
import { AuthState } from "./auth.type";
import { z } from "zod";
import Contact from "@/models/Contact";
import { redirect } from "next/navigation";

const registerSchema = z.object({
    nickname: z.string().trim().min(3, "Le pseudo doit comporter au moins 3 caractères"),
    password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères")
});

export async function register(state: AuthState,formdata: FormData): Promise<AuthState> {
    const validation = registerSchema.safeParse({
        nickname: formdata.get("nickname"),
        password: formdata.get("password")
    });

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: "Le formulaire contient des erreurs"
        }
    }

    const { nickname, password } = validation.data;

    const existingUser = await Contact.findOne({
        where: { nickname }
    });

    if(existingUser){
        return {
            errors: {
                nickname: ["Un compte existe déjà avec ce pseudo"]
            }
        }
    }

    try{
        const hash = await argon2.hash(password);

        const user = await Contact.create({
            nickname,
            password: hash
        });
    }catch(error){
        console.error("Erreur pendant l'inscription :", error);
        return {
            message: "impossible de créer le compte",
        }
    }

    redirect("/dashboard");

}