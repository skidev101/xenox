
export default function VersionModal ({
    showVersionModal,
    darkmode,
    newVersionNo,
    setNewVersionNo,
    setShowVersionModal,
    handleCreateVersion
}){
    return(
        <>
         {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70">
          <div className={`rounded-[14px] shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-bold mb-4 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              Create New Version
            </h3>
            <input
              type="number"
              value={newVersionNo}
              onChange={(e) => setNewVersionNo(e.target.value)}
              placeholder="Version no"
              className={`w-full p-2 rounded-md border mb-4 ${darkmode ? 'bg-[#111313] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowVersionModal(false)}
                className={`px-4 py-2 rounded-md ${darkmode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateVersion}
                className={`px-4 py-2 rounded-md ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    )
}