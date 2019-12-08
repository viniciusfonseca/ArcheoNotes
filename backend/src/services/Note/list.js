module.exports = async function list({ page = 1, count = 10 }) {

    const notes = await App.Models.note.findAll({
        offset: page * count,
        limit: count,
        where: {}
    })

    return notes
}