const FontList = ({ fonts, setFonts }) => {
  // Function to handle font deletion
  const handleDelete = (id) => {
    setFonts(fonts.filter((font, index) => index !== id));
  };

  return (
    <div className="mt-8  rounded-lg border border-gray-200 p-6 bg-white">
      <h3 className="font-semibold text-xl">Uploaded Fonts:</h3>
      <p className="text-base text-gray-600">
        Brower a List of Zepto fonts to build your font group:
      </p>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-base text-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
              >
                Font Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
              >
                Priview
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-sm font-medium text-gray-700 uppercase bg-gray-100"
              ></th>
            </tr>
          </thead>
          <tbody>
            {fonts.map((font, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td
                  scope="row"
                  className=" px-6 py-4 text-gray-900 whitespace-nowrapfont-medium"
                >
                  {font.name}
                </td>

                <td
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: font.name }}
                >
                  Example Style
                </td>
                <td className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                  <button
                    onClick={() => handleDelete(index)}
                    className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {fonts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-5 text-center text-gray-500">
                  No fonts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FontList;
