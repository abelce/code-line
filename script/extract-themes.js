import path from 'path'
import fs from 'fs'

function run () {
  const ans = []
  const dir = process.cwd()
  const themesDir = dir + '/themes'
  var list = fs.readdirSync(themesDir)
  for (var i = 0; i < list.length; i++) {
    var filename = path.join(themesDir, list[i])
    var stat = fs.statSync(filename)
    if (filename == '.' || filename == '..') {
    } else if (stat.isDirectory()) {
    } else {
      const file = fs.readFileSync(filename, 'utf-8')
      const obj = JSON.parse(file)
      ans.push({
        label: obj.displayName,
        value: obj.name,
        background: obj.colors['editor.background']
      })
    }
  }

  console.log(ans)
}

run()
