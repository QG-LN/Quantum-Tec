let editingId = null;
let setEditingId = null;
let originalContent = null;
let setOriginalContent = null;

function setEditingValue(newValue) {
    editingId = newValue.editingId;
    setEditingId = newValue.setEditingId;
    originalContent = newValue.originalContent;
    setOriginalContent = newValue.setOriginalContent;
}

export { setEditingValue, editingId, setEditingId, originalContent, setOriginalContent };