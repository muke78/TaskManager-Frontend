import { useCallback, useState } from "react";
import { useTaskQueries } from "./useTaskQueries";
import { useTheme } from "./useTheme";
import Swal from "sweetalert2";

export const useTableTask = () => {
  const [openModaUpdateTask, setOpenModaUpdateTask] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const { data: displayData = [], deleteTaskAsync, deleteTaskBulkAsync } = useTaskQueries(activeFilter);
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
        title: "¿Estás seguro(a)?",
        text: "Una vez eliminado, ¡no podrá recuperar este registro!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        theme: changeTheme === "night" ? "dark" : "light",
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
      title: "¿Eliminar seleccionados?",
      text: `Eliminarás ${selectedIds.length} registros.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      theme: changeTheme === "night" ? "dark" : "light",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaskBulkAsync({ ids: selectedIds });
        setSelectedIds([]);
      }
    });
  }, [deleteTaskBulkAsync, selectedIds, changeTheme]);

  const renderStatus = useCallback((status) => {
    switch (status) {
      case "Active":
        return <span className="badge badge-soft badge-info">Activa</span>;
      case "Complete":
        return (
          <span className="badge badge-soft badge-success">Completada</span>
        );
      default:
        return <span className="badge badge-soft badge-error">No hechas</span>;
    }
  }, []);

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
    // Handlers
    handleOpenUpdateTask,
    handleCheckTask,
    handleCheckAll,
    eliminar,
    eliminarSeleccionados,
    renderStatus,
  };
};