var slugify = require('slugify')
const mkdirp = require('mkdirp')
var fs = require('fs')

const Webflow = require('webflow-api')
const api_token = '21185979196f181ebc0412249e5a56e7f7700a6a201659bec8291056ab6d8297'
const site_id = '595fbfae5b9a9013ee8e97a3'

const webflow = new Webflow({ token: api_token })

// Promise <[ Collection ]>
const coll = webflow.collections({ siteId: site_id });

coll.then(
    c => {
        for( var i = 0; i < c.length; i++ ) {
            // console.log(c[i])
            var id = c[i]._id
            var name = c[i].name
            console.log('collection id: ' + id + ' name: ' + name)
            mkdirp.sync(`./content/${slugify(name)}`);
            var items = webflow.items({ collectionId: id }, {limit: 100});
            items.then(
                item => {
                    var filecontent = '---\n'
                    for(var i = 0; i < item.items.length; i++) {
                        console.log(item.items[i].name + " slug: " + item.items[i].slug )
                        filecontent += `title: ${item.items[i].name}\n`
                        filecontent += `slug: ${item.items[i].slug}\n`
                        filecontent += `---\n`
                        fs.writeFile(`./content/${slugify(name)}/${slugify(item.items[i].slug)}.md`, filecontent, (error) => { /*handle error */ })
                    }
                }   
            )
        }
    }
);