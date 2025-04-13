import React from "react";
import { v } from "../../styles/variables";

export const StatusFilter = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="dropdown dropdown-right mb-4">
      <div tabIndex={0} role="button" className="btn btn-neutral">
        Filtro de estatus {v.iconoFiltro && <v.iconoFiltro />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content flex flex-row text-nowrap gap-2 ml-4"
      >
        <FilterButton
          filter="All"
          label="Todas"
          icon={v.iconoTodasLasTareas}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <FilterButton
          filter="Active"
          label="Activas"
          icon={v.iconoActivas}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <FilterButton
          filter="Complete"
          label="Completadas"
          icon={v.iconoCompletadas}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <FilterButton
          filter="ItWasNot"
          label="No hechas"
          icon={v.iconoNoCompletadas}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </ul>
    </div>
  );
};

const FilterButton = ({
  filter,
  label,
  icon: Icon,
  activeFilter,
  setActiveFilter,
}) => {
  const getButtonClass = () => {
    const baseClass = "btn text-lg";
    switch (filter) {
      case "All":
        return `${baseClass} ${
          activeFilter === filter ? "btn-neutral" : "btn-outline"
        }`;
      case "Active":
        return `${baseClass} ${
          activeFilter === filter ? "btn-info" : "btn-soft btn-info"
        }`;
      case "Complete":
        return `${baseClass} ${
          activeFilter === filter ? "btn-success" : "btn-soft btn-success"
        }`;
      case "ItWasNot":
        return `${baseClass} ${
          activeFilter === filter ? "btn-error" : "btn-soft btn-error"
        }`;
      default:
        return baseClass;
    }
  };

  return (
    <li>
      <button
        className={getButtonClass()}
        onClick={() => setActiveFilter(filter)}
      >
        {Icon && <Icon />}
        <span className="text-base">{label}</span>
      </button>
    </li>
  );
};
