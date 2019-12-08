module.exports = async function addNote({ title, content }) {

    const note = await App.Models.note.create({ title, content })

    return note
}