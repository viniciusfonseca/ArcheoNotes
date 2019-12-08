module.exports = async function removeNote(id) {

    await App.Models.note.destroy({ where: { id } })
}