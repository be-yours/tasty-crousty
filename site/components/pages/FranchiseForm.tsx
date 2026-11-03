"use client"

/**
 * Franchise application form · DEMONSTRATION ONLY (CLIENT ZONE).
 *
 * Validates in the browser and shows a confirmation. Nothing leaves the page:
 * no fetch, no Convex mutation, no storage of any kind.
 */

import { useState, type FormEvent } from "react"
import { Input, Label, Textarea } from "@be-yours/ui"

type Field = "nom" | "email" | "ville" | "message"
type Errors = Partial<Record<Field, string>>

const ORDER: Field[] = ["nom", "email", "ville", "message"]
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_MESSAGE = 20

function validate(data: FormData): Errors {
  const read = (field: Field) => String(data.get(field) ?? "").trim()
  const errors: Errors = {}

  if (!read("nom")) errors.nom = "Dis-nous comment tu t'appelles."
  const email = read("email")
  if (!email) errors.email = "Il nous faut ton e-mail pour te répondre."
  else if (!EMAIL.test(email)) errors.email = "Cet e-mail a l'air bizarre. Exemple : prenom@exemple.fr"
  if (!read("ville")) errors.ville = "Quelle ville vises-tu ?"
  const message = read("message")
  if (!message) errors.message = "Raconte-nous un peu ton projet."
  else if (message.length < MIN_MESSAGE)
    errors.message = `Encore un effort : ${MIN_MESSAGE} caractères minimum.`

  return errors
}

export function FranchiseForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const found = validate(new FormData(form))
    setErrors(found)

    const first = ORDER.find((field) => found[field])
    if (first) {
      setSent(false)
      const input = form.elements.namedItem(first)
      if (input instanceof HTMLElement) input.focus()
      return
    }

    // Demo: nothing is sent or stored. The form is simply cleared.
    form.reset()
    setSent(true)
  }

  function onInput(field: Field) {
    if (sent) setSent(false)
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const describe = (field: Field) => (errors[field] ? `fr-${field}-err` : undefined)

  return (
    <form className="tc-form" noValidate onSubmit={onSubmit}>
      <div className="tc-form-grid">
        <div className="tc-field">
          <Label htmlFor="fr-nom">Nom et prénom</Label>
          <Input
            id="fr-nom"
            name="nom"
            autoComplete="name"
            required
            aria-invalid={errors.nom ? true : undefined}
            aria-describedby={describe("nom")}
            onInput={() => onInput("nom")}
          />
          {errors.nom ? (
            <p id="fr-nom-err" className="tc-err">
              {errors.nom}
            </p>
          ) : null}
        </div>

        <div className="tc-field">
          <Label htmlFor="fr-email">E-mail</Label>
          <Input
            id="fr-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            onInput={() => onInput("email")}
          />
          {errors.email ? (
            <p id="fr-email-err" className="tc-err">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="tc-field tc-field--wide">
          <Label htmlFor="fr-ville">Ville visée</Label>
          <Input
            id="fr-ville"
            name="ville"
            autoComplete="address-level2"
            required
            aria-invalid={errors.ville ? true : undefined}
            aria-describedby={describe("ville")}
            onInput={() => onInput("ville")}
          />
          {errors.ville ? (
            <p id="fr-ville-err" className="tc-err">
              {errors.ville}
            </p>
          ) : null}
        </div>

        <div className="tc-field tc-field--wide">
          <Label htmlFor="fr-message">Ton projet en quelques mots</Label>
          <Textarea
            id="fr-message"
            name="message"
            rows={5}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message") ?? "fr-message-hint"}
            onInput={() => onInput("message")}
          />
          {errors.message ? (
            <p id="fr-message-err" className="tc-err">
              {errors.message}
            </p>
          ) : (
            <p id="fr-message-hint" className="tc-hint">
              {MIN_MESSAGE} caractères minimum. Ton parcours, ta ville, ton envie.
            </p>
          )}
        </div>
      </div>

      <div className="tc-form-foot">
        <button type="submit" data-slot="button" data-variant="default" className="tc-btn tc-btn--big">
          Envoyer ma candidature
        </button>
        <p className="tc-hint">Tous les champs sont obligatoires.</p>
      </div>

      <div className={sent ? "tc-confirm tc-confirm--on" : "tc-confirm"} role="status" aria-live="polite">
        {sent ? (
          <p>
            <span className="tc-confirm__script" aria-hidden="true">
              Merci !
            </span>
            <span className="tc-confirm__text">
              Candidature bien reçue… par personne : c&apos;est une démo, rien n&apos;est envoyé ni enregistré.
            </span>
          </p>
        ) : null}
      </div>
    </form>
  )
}
