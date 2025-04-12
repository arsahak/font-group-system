export default function FontGroupList({ groups, onEdit, onDelete }) {
  return (
    <div className="mt-6 mb-14">
      <div className="mt-8  rounded-lg border border-gray-200 p-6 bg-white">
        <h3 className="font-semibold text-xl">Font Groups:</h3>
        <p className="text-base text-gray-600">List of aviable font groups:</p>

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-base text-left">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
                >
                  Fonts
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100 text-center"
                >
                  Count
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
                ></th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors "
                >
                  <td
                    scope="row"
                    className=" px-6 py-4 text-gray-900 whitespace-nowrapfont-medium"
                  >
                    {group.title}
                  </td>

                  <td className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    {group.fonts?.map((font, i) => (
                      <span
                        key={i}
                        style={{ fontFamily: font }}
                        className="text-md bg-gray-100 px-2 py-1 rounded mr-1"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </span>
                    ))}
                  </td>
                  <td className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors text-center">
                    {group.fonts?.length}
                  </td>
                  <td className="bg-white border-b border-gray-200 hover:bg-gray-50 flex items-center justify-center space-x-2 mt-5">
                    <button
                      onClick={() => onEdit(idx)}
                      className="cursor-pointer text-sm font-medium text-blue-500 hover:text-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(idx)}
                      className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty groups */}
              {groups.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-5 text-center text-gray-500"
                  >
                    No groups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
