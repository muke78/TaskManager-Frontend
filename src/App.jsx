import React from 'react';
import { TableTask } from './components/TableTask';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen mx-auto">
      {/* Header */}
      <header className="w-full max-w-[86rem] mx-auto py-6 px-4 md:px-6">
        <h1 className="text-5xl font-bold">Lista de Tareas</h1>
      </header>

      {/* Contenido principal */}
      <section className="flex w-full max-w-[86rem] mx-auto px-4 md:px-6">
        <TableTask />
        <Toaster position="bottom-right" reverseOrder={false} />
      </section>

      {/* Footer */}
      <footer className="w-full">
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </footer>
    </main>
  );
};
