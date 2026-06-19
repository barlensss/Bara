const fs = require('fs')

global.owner = "6283172030829" //owner number
global.namaowner = "BARA TO INTERNASIONAL" //owner name
global.footer = "BARA MPRUYY" //footer section
global.status = true //"self/public" section of the bot

global.lol = "";
global.mess = {
    owner: "\`[ !! ]\`\n.",
    group: "\`Mpruy\`\nFitur Khusus Di Dalam Group",
    private: "\`Mpruy\`\nFitur Khusus Private Chat",
    murbug: "\`Mpruy\`\nFitur Khusus Pengguna Murbug",
    admin: "\`Mpruy\`\nFitur Khusus Admin Group",
    botadmin: "\`Mpruy\`\nBot Harus Admin Terlebih Dahulu"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
