import osqueryVersionsData from 'data/osquery_versions.json'

const schemaVersionExists = schemaVersion => {
  return osqueryVersionsData.map(data => data.version).includes(schemaVersion)
}

export default schemaVersionExists
