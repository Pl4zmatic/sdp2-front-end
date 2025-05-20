import React from "react";
import SiteForm from "./SiteForm";

const SiteTable = ({
  sites,
  addingNew,
  onFormSubmit,
  onCancelEdit,
  verantwoordelijkes,
  onDelete,
  onEdit,
  editingPlant,
}) => {
  console.log(sites);
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto hidden md:block">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 bg-gray-900 font-medium">
          <div>ID</div>
          <div>NAME</div>
          <div>ADRESS</div>
          <div>SUPERVISOR</div>
          <div>EDIT</div>
          <div>DELETE</div>
        </div>
        {sites.length > 0 ? (
          sites.map((site) => (
            <React.Fragment key={site.ID}>
              <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 border-b border-gray-700 last:border-0">
                <div>{site.ID}</div>
                <div>{site.NAME}</div>
                <div className="w-40">{site.ADDRESS}</div>
                <div>
                  {site.verantwoordelijke.FIRSTNAME +
                    " " +
                    site.verantwoordelijke.LASTNAME}
                </div>
                <div>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => onEdit(site)}
                  >
                    ✏️
                  </button>
                </div>
                <div>
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => onDelete(site)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {editingPlant?.ID === site.ID && (
                <div className="col-span-6 bg-gray-900 p-4 border-b border-gray-700">
                  <SiteForm
                    onSubmit={onFormSubmit}
                    onCancel={onCancelEdit}
                    initialData={editingPlant}
                    verantwoordelijkes={verantwoordelijkes}
                  />
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400 col-span-6">
            No plants found
          </div>
        )}
        {addingNew && (
          <div className="col-span-6 bg-gray-900 p-4 border-b border-gray-700">
            <SiteForm
              onSubmit={onFormSubmit}
              onCancel={onCancelEdit}
              initialData={undefined}
              verantwoordelijkes={verantwoordelijkes}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteTable;
