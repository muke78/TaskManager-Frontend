import React from 'react';

export const TaskTableHeader = ({
  isChecked,
  onCheckAll,
}) => (
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckAll}
          className="checkbox checkbox-primary"
        />
      </th>
      <th>Editar</th>
      <th>ID</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Icon</th>
      <th>Estatus</th>
      <th>Mas opciones</th>
    </tr>
  </thead>
  // <thead>
  //   {table.getHeaderGroups().map((headerGroup) => (
  //     <tr key={headerGroup.id}>
  //       {headerGroup.headers.map((header) => (
  //         <th key={header.id}>
  //           {header.isPlaceholder ? null : (
  //             <div>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext()
  //               )}
  //               {header.column.getCanFilter() &&
  //                 header.column.id !== 'Status' && (
  //                   <div className="mt-2">
  //                     <input
  //                       type="text"
  //                       placeholder={`Filtrar ${header.column.columnDef.header}`}
  //                       value={
  //                         table.getColumn(header.id)?.getFilterValue() || ''
  //                       }
  //                       onChange={(e) =>
  //                         table
  //                           .getColumn(header.id)
  //                           ?.setFilterValue(e.target.value)
  //                       }
  //                       className="input input-sm input-bordered w-full max-w-xs"
  //                     />
  //                   </div>
  //                 )}
  //             </div>
  //           )}
  //         </th>
  //       ))}
  //     </tr>
  //   ))}
  // </thead>
);