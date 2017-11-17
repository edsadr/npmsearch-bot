const request = require('request')

const searchApi = 'http://npmsearch.com/query'
const fields = ['name', 'author', 'version', 'score', 'description']

/**
 * Main function for Webtask
 * @param  {Object}   context Webtask context
 * @param  {Function} cb      Callback sending the response to Slack
 */
function searchInNpm (context, cb) {
  const keyword = context.data.text.replace(context.data.trigger_word, '').trim()
  const url = `${searchApi}?q=name:'${keyword}'&fields=${fields.join(',')}&size=1`

  if (keyword === '' || keyword === 'help') {
    return cb(null, { attachments: [ showHelp(context.data.trigger_word) ] })
  }

  // Request consuming npmsearch.com API
  request.get(url, (err, res, body) => {
    if (err) {
      return cb(null, { attachments: [ handleError(err) ] })
    }

    try {
      const pkgs = JSON.parse(body)
      if (pkgs.results.length < 1) {
        return cb(null, { attachments: [ notFound(keyword) ] })
      }

      const attachment = createAttachment(pkgs.results[0])
      cb(null, { attachments: [ attachment ] })
    } catch (error) {
      cb(null, { attachments: [ handleError(error) ] })
    }
  })
}

/**
 * Function to handle errors uniformly
 * @param  {Object} err Error object
 * @return {Object}     Attachment formatted error message
 */
function handleError (err) {
  console.error(err.message)
  const errorMessage = {
    title: 'Unexpected error',
    fallback: `There was an error with your request, try again and if it persists contact your Slack admin`,
    color: '#C12127',
    text: `There was an error with your request, try again and if it persists contact your Slack admin`,
    footer: 'Provided by Npmsearch and NodeSource Certified Modules'
  }

  return errorMessage
}

/**
 * Function to handle the help message
 * @return {[type]}       Attachment formatted help message
 */
function showHelp (trigger) {
  const notFound = {
    title: 'Help',
    fallback: `Just send ${trigger} and a keyword to search like: '${trigger} wt'`,
    color: '#21CAC9',
    text: `Just send ${trigger} and a keyword to search like: '${trigger} wt`,
    footer: 'Provided by Npmsearch and NodeSource Certified Modules'
  }

  return notFound
}

/**
 * Function to handle empty search results
 * @param  {String} keyword the keyword user in the search
 * @return {[type]}         Attachment formatted not found message
 */
function notFound (keyword) {
  console.log(`There are no results for ${keyword}`)

  const notFound = {
    title: 'Package not found',
    fallback: `Your search did not return any results`,
    color: '#1f1666',
    text: `Your search did not return any results`,
    footer: 'Provided by Npmsearch and NodeSource Certified Modules'
  }

  return notFound
}

/**
 * Creates the attachment displaying a package result
 * @param  {Object} pkg Object containing the package details
 * @return {Object}     Attachment formatted result message
 */
function createAttachment (pkg) {
  const fieldsValues = fields.map(field => {
    return {
      title: field,
      value: (pkg[field]) ? pkg[field].toString() : '',
      short: field !== 'description'
    }
  })

  const attachment = {
    title: 'NPM Package found',
    fallback: `A package ${pkg.name} was found by ${pkg.author} with a score of: ${pkg.score}
              - https://www.npmjs.com/package/${pkg.name}`,
    color: '#21CAC9',
    title_link: `https://www.npmjs.com/package/${pkg.name}`,
    text: `A package was found, here are the details:`,
    fields: fieldsValues,
    footer: 'Provided by Npmsearch and NodeSource Certified Modules'
  }

  return attachment
}

module.exports = searchInNpm
