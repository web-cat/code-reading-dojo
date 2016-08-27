class ProgramSerializer < ActiveModel::Serializer
  attributes :id, :code, :difficulty, :level, :errorindexes
end
