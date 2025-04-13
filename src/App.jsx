import React, { useState } from "react";
import { TableTask } from "./components/TableTask";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { v } from "./styles/variables";
import { useTheme } from "./hooks/useTheme";

export const App = () => {
  const [openModaSaveTask, setOpenModaSaveTask] = useState(false);
  const { changeTheme, toggleTheme } = useTheme();

  return (
    <div className="min-h-scree flex flex-col bg-base-100 text-base-content">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Lista de Tareas
          </h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 absolute right-7 top-7 z-10">
          <div className="">
            {/* Avatar */}
            <div className="w-12 h-12 flex items-center justify-center bg-neutral text-neutral-content rounded-full">
              <button
                onClick={toggleTheme}
                className="swap swap-rotate"
                aria-label="Cambio de tema"
              >
                {changeTheme === "night" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.48.48 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.48.48 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.48.48 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.48.48 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.48.48 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.48.48 0 0 1-.272-.273z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 5q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5m4.95 2.05q-.275-.275-.275-.687t.275-.713l1.4-1.425q.3-.3.712-.3t.713.3q.275.275.275.7t-.275.7L18.35 7.05q-.275.275-.7.275t-.7-.275M20 13q-.425 0-.713-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8 10q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23M5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275t.7.275L7.05 5.65q.275.275.275.7t-.275.7q-.3.275-.7.275t-.7-.275m12.7 12.725l-1.4-1.425q-.275-.3-.275-.712t.275-.688t.688-.275t.712.275l1.425 1.4q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm2.225 6.775q-.275-.275-.275-.7t.275-.7L5.65 16.95q.275-.275.687-.275t.713.275q.3.3.3.713t-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            {/* Avatar */}
            <div className="w-12 h-12 flex items-center justify-center bg-neutral text-neutral-content rounded-full">
              <span className="font-bold text-lg">E</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <div className="flex justify-center md:justify-start mb-6">
            <button
              className="btn btn-warning flex items-center gap-2"
              onClick={() => setOpenModaSaveTask(!openModaSaveTask)}
            >
              Nueva tarea
              <span className="text-xl">
                {v.iconoAgregar && <v.iconoAgregar />}
              </span>
            </button>
          </div>

          <div className="rounded-lg overflow-hidden">
            <TableTask
              openModaSaveTask={openModaSaveTask}
              setOpenModaSaveTask={setOpenModaSaveTask}
            />
          </div>

          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: `${changeTheme === "night" ? "#1e293b" : changeTheme === "caramellatte" ? "#c93400" : "#c93400"}`,
                color: `${changeTheme === "night" ? "#eceff4" : changeTheme === "caramellatte" ? "#eceff4" : "#0f172a"}`,
              },
            }}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-base-content/30">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} - Gestor de Tareas</p>
        </div>
      </footer>

      {/* ReactQueryDevtools */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </div>
  );
};
