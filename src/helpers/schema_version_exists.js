import osqueryVersionsData from 'data/osquery_metadata'

const schemaVersionExists = schemaVersion => {
  return osqueryVersionsData.all_versions.includes(schemaVersion)
}

export default schemaVersionExists
