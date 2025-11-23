import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { trpc } from "@/lib/trpc";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Trophy,
  ArrowLeft,
  Users,
  Target,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { cn } from "../../lib/utils";

export const Route = createFileRoute("/tournaments/new")({
  component: NewTournamentPage,
});

const tournamentSchema = z.object({
  name: z.string().min(3, "Navnet må være minst 3 tegn"),
  type: z.enum(["AMERICANO", "MEXICANO"]),
  pointsToWin: z.number().min(10, "Minst 10 poeng").max(100, "Maks 100 poeng"),
  numberOfCourts: z.number().min(1, "Minst 1 bane"),
  numberOfPlayers: z
    .number()
    .min(4, "Minst 4 spillere")
    .refine((val) => val % 4 === 0, "Antall spillere må være delelig med 4"),
  playAllMatches: z.boolean(),
});

function NewTournamentPage() {
  const navigate = useNavigate();
  const createTournament = trpc.tournaments.create.useMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      type: "AMERICANO" as "AMERICANO" | "MEXICANO",
      pointsToWin: 21,
      numberOfCourts: 1,
      numberOfPlayers: 8,
      playAllMatches: true,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: tournamentSchema,
    },
    onSubmit: async ({ value }: { value: any }) => {
      try {
        const tournament = await createTournament.mutateAsync(value);
        navigate({
          to: "/tournaments/$tournamentId",
          params: { tournamentId: tournament.id },
        });
      } catch (error) {
        console.error("Failed to create tournament:", error);
      }
    },
  } as any);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate({ to: "/tournaments" })}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake til oversikt
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Trophy className="w-8 h-8" />
            </div>
            Ny Turnering
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Opprett en ny turnering ved å fylle ut detaljene nedenfor. Velg
            mellom Americano eller Mexicano format.
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-white/10">
          <CardHeader className="pb-8 border-b border-border/50">
            <CardTitle className="text-xl">Turneringskonfigurasjon</CardTitle>
            <CardDescription>
              Sett opp reglene for turneringen din.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
              <form.Field
                name="name"
                children={(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="text-base font-medium"
                    >
                      Turneringsnavn
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="F.eks. 'Sommerturneringen 2025'"
                      className="h-12 text-lg bg-background/50"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-sm text-destructive font-medium animate-in slide-in-from-left-1">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <form.Field
                name="type"
                children={(field) => (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Turneringsformat
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "AMERICANO",
                          title: "Americano",
                          desc: "Fast partner, bytter motstandere hver runde.",
                          icon: Users,
                        },
                        {
                          id: "MEXICANO",
                          title: "Mexicano",
                          desc: "Bytter både partner og motstandere basert på ranking.",
                          icon: Target,
                        },
                      ].map((type) => (
                        <div
                          key={type.id}
                          onClick={() => field.handleChange(type.id as any)}
                          className={cn(
                            "relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-accent",
                            field.state.value === type.id
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-card"
                          )}
                        >
                          {field.state.value === type.id && (
                            <div className="absolute top-4 right-4 text-primary">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                          <div className="flex items-center gap-4 mb-3">
                            <div
                              className={cn(
                                "p-2.5 rounded-lg transition-colors",
                                field.state.value === type.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <type.icon className="w-5 h-5" />
                            </div>
                            <div className="font-semibold text-lg">
                              {type.title}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {type.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <form.Field
                  name="pointsToWin"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="flex items-center gap-2"
                      >
                        <Target className="w-4 h-4 text-muted-foreground" />
                        Poeng for seier
                      </Label>
                      <Select
                        value={String(field.state.value)}
                        onValueChange={(val: string) =>
                          field.handleChange(Number(val))
                        }
                      >
                        <SelectTrigger className="bg-background/50 h-12">
                          <SelectValue placeholder="Velg poeng" />
                        </SelectTrigger>
                        <SelectContent>
                          {[11, 21, 32, 42, 50].map((points) => (
                            <SelectItem key={points} value={String(points)}>
                              {points} poeng
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors ? (
                        <p className="text-sm text-destructive font-medium">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  )}
                />

                <form.Field
                  name="numberOfCourts"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="flex items-center gap-2"
                      >
                        <LayoutGrid className="w-4 h-4 text-muted-foreground" />
                        Antall baner
                      </Label>
                      <Input
                        id={field.name}
                        type="number"
                        value={field.state.value as number}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        className="bg-background/50"
                      />
                      {field.state.meta.errors ? (
                        <p className="text-sm text-destructive font-medium">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  )}
                />

                <form.Field
                  name="numberOfPlayers"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="flex items-center gap-2"
                      >
                        <Users className="w-4 h-4 text-muted-foreground" />
                        Antall spillere
                      </Label>
                      <Input
                        id={field.name}
                        type="number"
                        value={field.state.value as number}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        className="bg-background/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Må være delelig med 4
                      </p>
                      {field.state.meta.errors ? (
                        <p className="text-sm text-destructive font-medium">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      ) : null}
                    </div>
                  )}
                />
              </div>

              <div className="pt-6 flex justify-end">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      size="lg"
                      className="min-w-[200px] text-lg font-semibold shadow-lg shadow-primary/20"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Oppretter...
                        </div>
                      ) : (
                        "Opprett Turnering"
                      )}
                    </Button>
                  )}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
