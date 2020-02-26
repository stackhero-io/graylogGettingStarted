require('dotenv').config()
const { Client } = require('@elastic/elasticsearch');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  if (!process.env.ELASTICSEARCH_HOST) {
    throw Error('You should first fill the .env-example file and rename it to .env');
  }

  // Connect to Elasticsearch server
  console.log();
  console.log('🔌  Connecting to Elasticsearch...');
  console.log();

  const client = new Client({
    node: `https://${process.env.ELASTICSEARCH_HOST}:9200`,
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD
    },
    ssl: {
      rejectUnauthorized: false // Always set this to true for security
    }
  });

  // This is a good practice to close Elasticsearch connection when the Node.js process receives the signal "TERM".
  process.once('SIGTERM', () => elasticsearch.close());


  console.log('-'.repeat(80));
  console.log('🌟 Retrieving cluster health');
  console.log();
  const clusterHealth = await client.cluster.health({});
  console.log(
    Object.keys(clusterHealth.body)
      .map(key => `\t- ${key}: ${clusterHealth.body[key]}`)
      .join('\n')
  );
  console.log();


  console.log('-'.repeat(80));
  console.log('🌟 Adding some datas to index "stackhero-test"');
  console.log();
  await client.index({
    index: 'stackhero-test',
    body: {
      reason: 'Stackhero test, running by elasticsearchGettingStarted script',
      date: new Date()
    }
  });


  console.log('-'.repeat(80));
  console.log('🌟 Forcing index refresh to be sure to be able to read the datas in the next search');
  console.log();
  await client.indices.refresh({ index: 'stackhero-test' })


  console.log('-'.repeat(80));
  console.log('🌟 Counting documents in index "stackhero-test"');
  console.log();
  const resCount = await client.count({
    index: 'stackhero-test'
  });

  console.log(`Found ${resCount.body.count} document(s) in index "stackhero-test" (it should increment each time you run this script)`);


  // Example of searching datas in an index:
  // console.log('-'.repeat(80));
  // console.log('🌟 Search for datas');
  // console.log();
  // const resSearch = await client.search({
  //   index: 'stackhero-test',
  //   body: {
  //     query: {
  //       range: {
  //         date: {
  //           lte: new Date()
  //         }
  //       }
  //     }
  //   }
  // });

  // console.log(resSearch.body.hits.hits);

})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  // Show HTTP body
  if (error.meta && error.meta.body) {
    console.error(JSON.stringify(error.meta.body));
  }
  process.exit(1);
});