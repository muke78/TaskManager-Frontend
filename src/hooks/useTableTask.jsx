import { useCallback, useMemo, useState } from 'react';
import { useTaskQueries } from './useTaskQueries';
import { useTheme } from './useTheme';
import Swal from 'sweetalert2';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

export const useTableTask = () => {
  const [openModaUpdateTask, setOpenModaUpdateTask] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const columnHelper = createColumnHelper();

  const handleStatusFilter = ({ target }) => {
    setActiveFilter(target.value);
  };

  const {
    data: displayData = [],
    deleteTaskAsync,
    deleteTaskBulkAsync,
  } = useTaskQueries(activeFilter);
  const { changeTheme } = useTheme();

  const handleOpenUpdateTask = useCallback((user) => {
    setSelectedUser(user);
    setOpenModaUpdateTask(true);
  }, []);

  const handleCheckTask = useCallback((id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((prevId) => prevId !== id)
    );
  }, []);

  const handleCheckAll = useCallback(
    (e) => {
      const allChecked = e.target.checked;
      setIsChecked(allChecked);
      setSelectedIds(allChecked ? displayData.map((d) => d.id) : []);
    },
    [displayData]
  );

  const eliminar = useCallback(
    (id) => {
      Swal.fire({
        title: '¿Estás seguro(a)?',
        text: 'Una vez eliminado, ¡no podrá recuperar este registro!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        theme: changeTheme === 'dark' ? 'dark' : 'light',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteTaskAsync({ id });
        }
      });
    },
    [deleteTaskAsync, changeTheme]
  );

  const eliminarSeleccionados = useCallback(() => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: '¿Eliminar seleccionados?',
      text: `Eliminarás ${selectedIds.length} registros.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      theme: changeTheme === 'dark' ? 'dark' : 'light',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaskBulkAsync({ ids: selectedIds });
        setSelectedIds([]);
      }
    });
  }, [deleteTaskBulkAsync, selectedIds, changeTheme]);

  const renderStatus = useCallback((status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="badge badge-info badge-soft w-full">Activo</span>
        );
      case 'Complete':
        return (
          <span className="badge badge-success badge-soft w-full">
            Completado
          </span>
        );
      case 'ItWasNot':
        return (
          <span className="badge badge-error badge-soft w-full">
            No se hizo
          </span>
        );
      default:
        return <span className="badge">Todos</span>;
    }
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor('id', {
        header: 'ID',
      }),
      columnHelper.accessor('title', {
        header: 'Nombre',
      }),
      columnHelper.accessor('description', {
        header: 'Descripción',
      }),
      columnHelper.accessor('icon', {
        header: 'Icon',
        cell: (info) => (
          <div className="text-center text-lg">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('Status', {
        header: 'Estatus',
        cell: (info) => renderStatus(info.getValue()),
        filterFn: (row, id, value) => {
          if (value === 'All') {
            return true;
          }
          return row.getValue(id) === value;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        cell: () => (
          <div className="flex flex-row gap-2">
            <button className="btn btn-soft btn-info" aria-label="Editar tarea">
              {/* Reemplaza esto con tu icono */}
              ✏️
            </button>
            <button
              className="btn btn-soft btn-error"
              aria-label="Eliminar tarea"
            >
              {/* Reemplaza esto con tu icono */}
              🗑️
            </button>
          </div>
        ),
      }),
    ],
    [columnHelper, renderStatus]
  );

  const table = useReactTable({
    displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      globalFilter: activeFilter === 'All' ? '' : activeFilter,
      rowSelection: selectedIds,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: selectedIds,
    onSortingChange: setSorting,
  })
   
  return {
    // States
    openModaUpdateTask,
    setOpenModaUpdateTask,
    selectedUser,
    setSelectedUser,
    activeFilter,
    setActiveFilter,
    isChecked,
    selectedIds,
    displayData,
    table,
    flexRender,
    // Handlers
    handleOpenUpdateTask,
    handleStatusFilter,
    handleCheckTask,
    handleCheckAll,
    eliminar,
    eliminarSeleccionados,
    renderStatus,
  };
};
