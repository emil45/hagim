"use client";

import { useState, createContext, useContext, useMemo, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/SideBar";
import { Footer } from "@/components/layout/Footer";
import { ContactDialog } from "@/components/feature/ContactDialog";
import { ScrollToTopButton } from "@/components/feature/ScrollToTopButton";
import { useLocalizedTools } from "@/hooks/useLocalizedTools";
import type { ToolData } from "@/types/tool";

interface AppShellProps {
  children: ReactNode;
}

interface AppContextType {
  selectedTribe: string;
  setSelectedTribe: (tribe: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPerformed: boolean;
  setSearchPerformed: (performed: boolean) => void;
  filteredTools: ToolData[];
  openContactDialog: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppShell");
  }
  return context;
}

function filterTools(tools: ToolData[], query: string): ToolData[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === "") {
    return [];
  }

  return tools.filter((tool) =>
    tool.tool.toLowerCase().includes(normalizedQuery) ||
    tool.aliases.some((alias) => alias.toLowerCase().includes(normalizedQuery)) ||
    tool.process.toLowerCase().includes(normalizedQuery)
  );
}

export function AppShell({ children }: AppShellProps): React.ReactElement {
  const pathname = usePathname();
  const [selectedTribe, setSelectedTribe] = useState("east");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const localizedTools = useLocalizedTools(selectedTribe);

  const filteredTools = useMemo(() => {
    return filterTools(localizedTools, searchQuery);
  }, [localizedTools, searchQuery]);

  function handleSearch(query: string): void {
    setSearchQuery(query);
    setSearchPerformed(query.trim().length > 0);
  }

  function toggleSidebar(): void {
    setSidebarOpen((prev) => !prev);
  }

  function openContactDialog(): void {
    setContactOpen(true);
  }

  return (
    <AppContext.Provider
      value={{
        selectedTribe,
        setSelectedTribe,
        searchQuery,
        setSearchQuery: handleSearch,
        searchPerformed,
        setSearchPerformed,
        filteredTools,
        openContactDialog,
      }}
    >
      <div className="relative min-h-screen flex flex-col">
        <TopBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Sidebar
          selectedTribe={selectedTribe}
          onTribeChange={setSelectedTribe}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          openContactDialog={openContactDialog}
          currentPath={pathname}
        />
        <div className="flex-1">{children}</div>
        <Footer />
        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
        <ScrollToTopButton />
      </div>
    </AppContext.Provider>
  );
}
