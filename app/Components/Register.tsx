"use client";

import { useActionState } from "react";
import { register } from "../actions/auth";
import type { AuthState } from "../actions/auth.type";

const initialState: AuthState = {};

export default function RegisterForm() {

    const [state, formAction, pending] = useActionState(
        register,
        initialState
    )

    return (
        <form action={formAction}>
            <div className="form-group">
                <label htmlFor="nickname">Pseudo</label>
                <input type="text" name="nickname" id="nickname" />
                {state.errors?.nickname?.map((error) => (
                    <p key={error}>{error}</p>
                ))}
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" />
                {state.errors?.password?.map((error) => (
                    <p key={error}>{error}</p>
                ))}
            </div>
            {state.message && <p>{state.message}</p>}
            <div className="form-group">
                <button type="submit" disabled={pending}>Inscription</button>
            </div>
        </form>
    );
}