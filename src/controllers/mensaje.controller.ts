import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {MensajeEmpleado} from '../models';
import {MensajeEmpleadoRepository} from '../repositories';

export class MensajeController {
  constructor(
    @repository(MensajeEmpleadoRepository)
    public mensajeEmpleadoRepository : MensajeEmpleadoRepository,
  ) {}

  @post('/mensajes')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(MensajeEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {
            title: 'NewMensajeEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeEmpleado: Omit<MensajeEmpleado, 'id'>,
  ): Promise<MensajeEmpleado> {
    return this.mensajeEmpleadoRepository.create(mensajeEmpleado);
  }

  @get('/mensajes/count')
  @response(200, {
    description: 'MensajeEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.count(where);
  }

  @get('/mensajes')
  @response(200, {
    description: 'Array of MensajeEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MensajeEmpleado) filter?: Filter<MensajeEmpleado>,
  ): Promise<MensajeEmpleado[]> {
    return this.mensajeEmpleadoRepository.find(filter);
  }

  @patch('/mensajes')
  @response(200, {
    description: 'MensajeEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.updateAll(mensajeEmpleado, where);
  }

  @get('/mensajes/{id}')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MensajeEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<MensajeEmpleado>
  ): Promise<MensajeEmpleado> {
    return this.mensajeEmpleadoRepository.findById(id, filter);
  }

  @patch('/mensajes/{id}')
  @response(204, {
    description: 'MensajeEmpleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.updateById(id, mensajeEmpleado);
  }

  @put('/mensajes/{id}')
  @response(204, {
    description: 'MensajeEmpleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.replaceById(id, mensajeEmpleado);
  }

  @del('/mensajes/{id}')
  @response(204, {
    description: 'MensajeEmpleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeEmpleadoRepository.deleteById(id);
  }
}
