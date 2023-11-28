import { Model } from 'mongoose'
import { DataModel } from '../schema/data-model'
import { DataModelRepository } from '../repository/data-model-repository'
import { Test } from '@nestjs/testing'
import { DataModelService } from './data-model.service'
import { getModelToken } from '@nestjs/mongoose'
import { BadRequestException } from '@nestjs/common'
import { DATA_MESSAGE } from '../data.constant'
import { RequestContext } from '../../shared/service/request-context'
import { AuthenticatedUser } from '../../user/user.type'
import { DataModelDto } from '../dto/data-model-dto'

describe('Data Model Service', () => {
  let mockModelStorage: Model<DataModel>
  let storageRepository: DataModelRepository
  let storageService: DataModelService

  const authenticatedUser: AuthenticatedUser = {
    id: 'AUTHENTICATED-USER-ID',
    email: 'user@email.com'
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DataModelService,
        DataModelRepository,
        {
          provide: getModelToken(DataModel.name),
          useValue: Model
        },
        {
          provide: RequestContext,
          useValue: { authenticatedUser }
        }
      ]
    })
      .compile()

    mockModelStorage = moduleRef.get<Model<DataModel>>(getModelToken(DataModel.name))
    storageRepository = moduleRef.get(DataModelRepository)
    storageService = await moduleRef.resolve(DataModelService)
  })

  describe('Create method', () => {
    it('it should be failed when the name is duplicated', async () => {
      const storage = new DataModel
      storage.name = 'storage-name'

      jest.spyOn(storageRepository, 'findOne').mockResolvedValue(storage)

      try {
        await storageService.create({
          dataStorageId: 'sample-storage-id',
          name: 'storage-name',
          fields: []
        })
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.message).toBe(DATA_MESSAGE.STORAGE_NAME_IS_DUPLICATED)
      }
    })

    it('it should be succeed when dto.name equals to persisted name', async () => {
      const dto = new DataModelDto
      dto.name = 'storage-simple-name'
      dto.fields = []

      let persistedName = ''

      jest.spyOn(storageRepository, 'findOne').mockResolvedValue(null)

      jest.spyOn(storageRepository, 'create').mockImplementation(async (entity: DataModel) => {
        persistedName = entity.name
        return entity
      })

      await storageService.create(dto)

      expect(persistedName).toEqual(dto.name)
    })

    it('it should be failed if fields is empty', async () => {
      const dto = new DataModelDto
      dto.name = 'storage-simple-name'
      dto.fields = []

      jest.spyOn(storageRepository, 'findOne').mockResolvedValue(null)

      try {
        await storageService.create(dto)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
        expect(e.message).toBe(DATA_MESSAGE.FIELD_LIST_MUST_NOT_BE_EMPTY)
      }
    })
  })
})
