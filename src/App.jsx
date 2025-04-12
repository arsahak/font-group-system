import { useState } from "react";
import FontGroupForm from "./components/FontGroupForm";
import FontGroupList from "./components/FontGroupList";
import FontList from "./components/FontList";
import FontUpload from "./components/FontUpload";

const App = () => {
  const [fonts, setFonts] = useState([]);
  const [groups, setGroups] = useState([]);

  // Function to handle font upload

  const handleUpload = (font) => setFonts([...fonts, font]);


  // Function to handle font group deletion

  const deleteGroup = (index) =>
    setGroups(groups.filter((_, idx) => idx !== index));


  const [editingGroup, setEditingGroup] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to handle font group editing

  const editGroup = (index) => {
    const group = groups[index];
    setEditingGroup(group);
    setEditingIndex(index);
  };

  // Function to save the font group

  const saveGroup = (newGroup) => {
    if (editingIndex !== null) {
      const updated = [...groups];
      updated[editingIndex] = newGroup;
      setGroups(updated);
    } else {
      setGroups([...groups, newGroup]);
    }
    setEditingGroup(null);
    setEditingIndex(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Font Group System</h1>
      <FontUpload onUpload={handleUpload} />
      <FontList fonts={fonts} setFonts={setFonts} />
      <FontGroupForm
        fonts={fonts}
        groups={groups}
        setGroups={setGroups}
        onSave={saveGroup}
        editingGroup={editingGroup}
      />
      <FontGroupList
        groups={groups}
        onEdit={editGroup}
        onDelete={deleteGroup}
      />
    </div>
  );
};

export default App;
