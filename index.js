'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetrictModel = setupMetricModel(config)

  // definiendo relaciones
  AgentModel.hasMany(MetrictModel)
  MetrictModel.belongsTo(AgentModel)

  // la ejecucion se pausa aqui hasta que esta promesa sea ejecutada
  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
