const MockServices = require('../__mocks__/MockServices')

describe('Services', () => {
  let services

  beforeEach(() => {
    services = new MockServices()
  })

  describe('find', () => {
    it('Should return the service', () => {
      const response = services.find('test')
      expect(response).toEqual([])
    })
  })
  describe('find_by', () => {
    it('Should return the service', () => {
      const response = services.find_by({ test: 'test' })
      expect(response).toEqual({ message: 'found by mock' })
    })
    it('Should return an error', () => {
      const response = services.find_by()
      expect(response).toEqual(new Error('Invalid data'))
    })
  })
  describe('find_one_by', () => {
    it('Should return the service', () => {
      const response = services.find_one_by({ test: 'test' })
      expect(response).toEqual({ message: 'found by mock' })
    })
    it('Should return an error', () => {
      const response = services.find_one_by()
      expect(response).toEqual(new Error('Invalid data'))
    })
  })
  describe('find_relation', () => {
    it('Should return the service', () => {
      const response = services.find_relation({ test: 'test' }, 'relation')
      expect(response).toEqual({ message: 'found relations by mock' })
    })
    it('Should return an error Data', () => {
      const response = services.find_relation({}, 'relation')
      expect(response).toEqual(new Error('Invalid data'))
    })
    it('Should return an error Relation', () => {
      const response = services.find_relation({ test: 'test' })
      expect(response).toEqual(new Error('Invalid relation'))
    })
  })

  describe('create', () => {
    it('Should return the service', () => {
      const response = services.create({ test: 'test' })
      expect(response).toEqual({ message: 'created by mock' })
    })
    it('Should return an error', () => {
      const response = services.create()
      expect(response).toEqual(new Error('Invalid data'))
    })
  })

  describe('update', () => {
    it('Should return the service', () => {
      const response = services.update('test', { test: 'test' })
      expect(response).toEqual({ message: 'updated by mock' })
    })
    it('Should return an error ID', () => {
      const response = services.update({ test: 'test' })
      expect(response).toEqual(new Error('Invalid data'))
    })
    it('Should return an error DATA', () => {
      const response = services.update('test', {})
      expect(response).toEqual(new Error('Invalid data'))
    })
  })

  describe('delete', () => {
    it('Should return the service', () => {
      const response = services.delete('test')
      expect(response).toEqual({ message: 'deleted by mock' })
    })
    it('Should return an error', () => {
      const response = services.delete()
      expect(response).toEqual(new Error('Invalid id'))
    })
  })
})
