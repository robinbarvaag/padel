import { Link } from "@tanstack/react-router";
import { Home, LogIn, LogOut, Trophy, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";

export default function Header() {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const sidebarItems = [
    {
      title: "Hjem",
      icon: Home,
      to: "/",
    },
    {
      title: "Turneringer",
      icon: Trophy,
      to: "/tournaments",
    },
    {
      title: "Spillere",
      icon: Users,
      to: "/players",
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="hidden md:flex">
        <SidebarHeader className="border-b border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/" className="flex items-center gap-3">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Trophy className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">PADEL</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Turnering Tracker
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                    activeProps={{
                      className: "bg-accent text-accent-foreground",
                    }}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
          <SidebarMenu>
            {session ? (
              <>
                <SidebarMenuItem>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="size-4" />
                      <span>Logg ut</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/auth/login" className="flex items-center gap-3">
                    <LogIn className="size-4" />
                    <span>Logg inn</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="size-4" />
            </div>
            <h1 className="text-lg font-semibold hidden sm:block">
              PADEL Tracker
            </h1>
            <h1 className="text-lg font-semibold sm:hidden">PADEL</h1>
          </div>
        </div>
        <div className="px-4">
          <ThemeToggle />
        </div>
      </header>
    </SidebarProvider>
  );
}
