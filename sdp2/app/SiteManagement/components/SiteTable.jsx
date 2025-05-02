import React from "react";


    const SiteTable =  ({sites}) => {
    console.log(sites)
return(
  <div className="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto hidden md:block">
    <div className="min-w-[600px]">
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 bg-gray-900 font-medium">
        <div>ID</div>
        <div>NAME</div>
        <div>ADRESS</div>
        <div>VERANTWOORDELIJKE</div>
        <div>MACHINES</div>
      </div>
      {sites.length > 0 ? (
        sites.map((site) => (
          <React.Fragment key={site.ID}>
            <div
              className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_0.5fr] p-4 border-b border-gray-700 last:border-0"
            >
              <div>{site.ID}</div>
              <div>{site.NAME}</div>
              <div>{site.ADDRESS}</div>
              <div>{site.VERANTWOORDELIJKE}</div>
              {/* <div>{site.MACHINES.length}</div> */}
              <div>
                <button
                  className="text-red-500 hover:text-red-400"
                >
                  ✏️
                </button>
              </div>
              <div>
                <button
                  className="text-red-500 hover:text-red-400"
                >
                  🗑️
                </button>
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="p-4 text-center text-gray-400 col-span-6">
          No plants found
        </div>
      )}
    </div>
  </div>
)
};

export default SiteTable; 