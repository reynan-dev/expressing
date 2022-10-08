class BaseServices {
  find () {
    try {
      return []
    } catch (error) {
      return error
    }
  }

  find_by (filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data')
      }
      return { message: 'found by mock' }
    } catch (error) {
      return error
    }
  }

  find_one_by (filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data')
      }
      return { message: 'found by mock' }
    } catch (error) {
      return error
    }
  }

  find_relation (filter = {}, relation = '') {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data')
      }

      if (!relation) {
        throw new Error('Invalid relation')
      }

      return { message: 'found relations by mock' }
    } catch (error) {
      return error
    }
  }

  create (data = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data')
      }
      return { message: 'created by mock' }
    } catch (error) {
      return error
    }
  }

  update (id, data = {}) {
    if (!id) {
      throw new Error('Invalid id')
    }

    this.find_one_by({ id })

    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data')
      }
      return { message: 'updated by mock' }
    } catch (error) {
      return error
    }
  }

  delete (id) {
    try {
      if (!id) {
        throw new Error('Invalid id')
      }
      return { message: 'deleted by mock' }
    } catch (error) {
      return error
    }
  }
}

module.exports = BaseServices
