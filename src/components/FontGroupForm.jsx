import { useEffect, useState } from "react";

const FontGroupForm = ({ fonts, onSave, editingGroup }) => {
  const [groupTitle, setGroupTitle] = useState("");
  const [rows, setRows] = useState([
    { fontName: "", font: [], size: 1.0, priceChange: 0, isOpen: false },
  ]);

  useEffect(() => {
    if (editingGroup) {
      setGroupTitle(editingGroup.title);
      setRows(
        editingGroup.rows.map((row) => ({
          ...row,
          isOpen: false,
        }))
      );
    }
  }, [editingGroup]);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const toggleFontDropdown = (index) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, isOpen: !row.isOpen } : { ...row, isOpen: false }
    );
    setRows(updatedRows);
  };


  // Function to handle font selection

  const toggleFontSelection = (index, value) => {
    const selected = rows[index].font;
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    handleRowChange(index, "font", updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { fontName: "", font: [], size: 1.0, priceChange: 0, isOpen: false },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  // Function to handle the creation or update of font groups

  const handleCreateOrUpdate = () => {
    if (!groupTitle.trim()) {
      alert("Group title is required.");
      return;
    }

    if (
      rows.length < 1 ||
      rows.some((r) => !r.fontName || r.font.length === 0)
    ) {
      alert("Each row must have a font name and at least one selected font.");
      return;
    }

    const allFonts = Array.from(new Set(rows.flatMap((r) => r.font)));

    const groupData = {
      title: groupTitle,
      fonts: allFonts,
      rows: rows.map(({ isOpen, ...r }) => ({ ...r })),
    };

    onSave(groupData);

    setGroupTitle("");
    setRows([
      { fontName: "", font: [], size: 1.0, priceChange: 0, isOpen: false },
    ]);
  };

  return (
    <div className="">
      <div className="mb-4">
        <h3 className="font-semibold text-xl">Create Font Groups:</h3>
        <p className="text-base text-gray-600">
          You have to select at least two fonts:
        </p>
      </div>

      <input
        type="text"
        placeholder="Group Title"
        value={groupTitle}
        onChange={(e) => setGroupTitle(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 border-gray-200"
      />

      {rows.map((row, idx) => (
        <div
          key={idx}
          className="flex flex-wrap gap-2 items-start mb-2 border p-3 rounded border-gray-200"
        >
          {/* Font Name */}
          <input
            type="text"
            placeholder="Font Row Name"
            value={row.fontName}
            onChange={(e) => handleRowChange(idx, "fontName", e.target.value)}
            className="flex-1 w-full border rounded px-3 py-2 mb-4 border-gray-200"
          />

          {/* Custom Multi-Select */}
          <div className="relative w-full max-w-sm">
            <button
              type="button"
              className="border border-gray-200 rounded  w-full px-3 py-2 text-left "
              onClick={() => toggleFontDropdown(idx)}
            >
              {row.font.length > 0 ? row.font.join(", ") : "Select Fonts"}
            </button>

            {row.isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto dark:bg-gray-700 dark:border-gray-600">
                {fonts.map((f, i) => (
                  <label
                    key={i}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={row.font.includes(f.name)}
                      onChange={() => toggleFontSelection(idx, f.name)}
                      className="mr-2"
                    />
                    {f.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Remove Row */}
          <button
            onClick={() => removeRow(idx)}
            className="text-red-500 hover:text-red-700 mt-2 text-sm"
          >
            ❌
          </button>
        </div>
      ))}

      {/* Add Row */}
      <div className="flex justify-between items-center spa gap-2 mt-4">
        <button
          onClick={addRow}
          className="border px-4 py-1 rounded text-green-700 border-green-500 hover:bg-green-100"
        >
          + Add Row
        </button>

        {/* Create Groups and Update */}

        <button
          onClick={handleCreateOrUpdate}
          className="bg-green-600 text-white px-6 py-1 rounded hover:bg-green-700"
        >
          {editingGroup ? "Update Group" : "Create Group"}
        </button>
      </div>
    </div>
  );
};

export default FontGroupForm;
