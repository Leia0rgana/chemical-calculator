import mongoose from 'mongoose'
const Schema = mongoose.Schema

const elementSchema = new Schema({
  name: String,
  appearance: String,
  atomic_mass: Number,
  boil: Number,
  category: String,
  density: Number,
  discovered_by: String,
  melt: Number,
  molar_heat: Number,
  number: Number,
  period: Number,
  group: Number,
  phase: String,
  summary: String,
  symbol: String,
  xpos: Number,
  ypos: Number,
  wxpos: Number,
  wypos: Number,
  shells: [Number],
  electron_configuration: String,
  electron_configuration_semantic: String,
  electron_affinity: Number,
  electronegativity_pauling: Number,
  ionization_energies: [Number],
  'cpk-hex': String,
  image: {
    title: String,
    url: String,
    attribution: String,
  },
  block: String,
})

const Element = mongoose.model('Element', elementSchema, 'periodic-table')

export default Element
