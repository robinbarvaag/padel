# Padel Tournament Manager 🎾

En moderne webapp for å administrere Padel-turneringer (Americano & Mexicano) med automatisk ELO-beregning og realtime oppdateringer.

## ✨ Features

- **Turneringstyper**: Støtte for både Americano og Mexicano
- **Smart spillerhåndtering**: Opprett "placeholder" spillere som kan claimes senere
- **Optimalisert UX**: Klikk på vinner → velg motstanderens score → ferdig!
- **ELO-system**: Automatisk beregning og oppdatering av ELO ratings
- **Realtime**: Se hvem som er online og registrerer scores (kommer)
- **Fleksible regler**: Tilpass poeng-til-seier, antall baner, osv.

## 🚀 Tech Stack

- **Frontend**: React 19, TanStack Router, TailwindCSS
- **Backend**: tRPC, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Runtime**: Bun
- **Tooling**: Biome (linting & formatting), Vite

## 📦 Installasjon

```bash
# Installer dependencies
bun install

# Sett opp .env fil
cp .env.example .env
# Legg til DATABASE_URL og andre nødvendige env vars

# Kjør database migrations
bun run db:push

# Start dev server
bun run dev
```

## 🗄️ Database Schema

### Hovedtabeller

- **user**: Better Auth users
- **player**: Spillere (både placeholder og claimede)
- **tournament**: Turneringer med innstillinger
- **match**: Kamper med score
- **matchParticipant**: Kobling mellom spillere og kamper

### Placeholder-konsept

Spillere opprettes som "placeholder" av admin/innlogget bruker. De får:

- Unikt brukernavn
- Standard ELO (1200)
- `isPlaceholder: true`

Senere kan brukere "claime" sitt brukernavn (godkjennes av admin), og da:

- `userId` settes
- `isPlaceholder: false`
- Bruker får tilgang til sine stats og historikk

## 🎮 Hvordan bruke

### 1. Opprett spillere

Gå til `/players` og legg til spillere med unike brukernavn.

### 2. Opprett turnering

Gå til `/tournaments/new` og sett opp:

- Navn
- Type (Americano/Mexicano)
- Poeng til seier (standard 21)
- Antall baner
- Antall spillere

### 3. Registrer scores

Bruk den smarte score-inputen:

1. Klikk på laget som vant
2. Velg motstanderens score (0-20)
3. Vinneren får automatisk 21 poeng
4. ELO oppdateres automatisk

## 🧮 ELO-system

Bruker standard ELO-beregning med:

- **K-factor**: 32 (standard)
- **Score multiplier**: Større seiere gir mer ELO (maks 1.5x)
- **Team average**: ELO beregnes basert på gjennomsnitt av lag

Formelen:

```
new_elo = old_elo + K * score_multiplier * (actual_score - expected_score)
```

## 🔮 Neste steg

- [ ] Implementer matchmaking-algoritme for Americano/Mexicano
- [ ] Realtime med WebSockets/tRPC subscriptions
- [ ] Claim-flyt for spillere
- [ ] Admin-dashboard
- [ ] Turnering brackets/oversikt
- [ ] Statistikk og grafer
- [ ] Mobile-first PWA
- [ ] Export data (CSV/PDF)

## 🛠️ Development

```bash
# Kjør tests
bun test

# Format kode (TODO: sett opp Biome scripts)
bun run format

# Type-check
tsc --noEmit

# Build for production
bun run build

# Preview production build
bun run serve
```

## 📝 Notater

Dette er et hobbyprosjekt for å:

- Lære TanStack Router (fra Next.js bakgrunn)
- Utforske Bun og Biome
- Eksperimentere med tRPC
- Bygge noe gøy og nyttig!

Fokus på god UX, moderne stack, og læring.
