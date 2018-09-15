const fs = require("fs");

function getIcons() {

    let faList = JSON.parse(fs.readFileSync('faicons.json', 'utf8'))    
    let faBrandIcons = "fontawesome_brand_icons:\n";
    let faSolidIcons = "fontawesome_solid_icons:\n";

    for(let i = 0; i < faList.icons.length; i++) {
        let icon = faList.icons[i]
        if(icon.includes("fab ")) {
            faBrandIcons += `- ${icon.replace("fab fa-", "")}\n`
        }
        if(icon.includes("fas ")) {
            faSolidIcons += `- ${icon.replace("fas fa-", "")}\n`
        }
    }

    fs.writeFileSync("data/icons.yaml", faBrandIcons + faSolidIcons, 'utf8')
    console.log(faList.icons.length + " icons listed in data/icons.yaml")
}

getIcons()