import React, { useState } from 'react';
import { TableTask } from './components/TableTask';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { v } from './styles/variables';

export const App = () => {
  const [openModaSaveTask, setOpenModaSaveTask] = useState(false);

  
  return (
    <div className="min-h-scree flex flex-col">
      {/* Header */}
      <header className="py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Lista de Tareas
          </h1>
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
          
          <div className="rounded-lg shadow-md overflow-hidden">
            <TableTask
              openModaSaveTask={openModaSaveTask}
              setOpenModaSaveTask={setOpenModaSaveTask}
            />
          </div>
          
          <Toaster position="bottom-right" reverseOrder={false} />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-4 border-t border-base-content/30">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} - Gestor de Tareas</p>
        </div>
      </footer>
      
      {/* ReactQueryDevtools */}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    </div>
  );
};