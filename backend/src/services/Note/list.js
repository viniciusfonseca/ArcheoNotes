module.exports = async function list({ page = 1, count = 10 }) {

    console.log({ page, count }, {
        offset: page * count,
        limit: count,
    })

    const notes = await App.Models.note.findAll({
        offset: (page - 1) * count,
        limit: count,
        order: [ ['updatedAt', 'DESC'] ]
    })

    return notes
}