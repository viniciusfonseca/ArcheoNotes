module.exports = async function editNote(id, { title, content }) {

    await App.Models.note.update({ title, content }, { where: { id } })

    const note = await App.Models.note.findByPk(id)

    return note
}