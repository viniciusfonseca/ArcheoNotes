module.exports = async function getInfo(noteId) {
    const note = await App.Models.note.findByPk(noteId)
    
    return note
}