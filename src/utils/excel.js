import XLSX from 'xlsx'

function auto_width(ws, data) {
  /* set worksheet max width per col*/
  const colWidth = data.map(row => row.map(val => {
    /* if null/undefined*/
    if (val == null) {
      return {'wch': 10}
    }
    else if (val.toString().charCodeAt(0) > 255) {
      return {'wch': val.toString().length * 2}
    } else {
      return {'wch': val.toString().length}
    }
  }))
  /* start in the first row*/
  const result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
}

export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
export const read = (data, type) => {
  const workboox = XLSX.read(data, {type})
  console.log('workboox---:', workboox)
  const firstSheetName = workboox.SheetNames[0]
  const worksheet = workboox.Sheets[firstSheetName]
  const headers = getHeaderRow(worksheet)
  const results = XLSX.utils.sheet_to_json(worksheet)
  return {headers, results}
}

function json_to_array(key, jsonData) {
  return jsonData.map(v => key.map(j => { return v[j] }))
}

/*
* @param[key] Array  ['name', 'age']
* @param[title] Array ['姓名', '年龄']
* @param[data] Array
* @param[filename] String
* @param[authWidth] Bollean
* */
export const exportArrayToExcel = ({key, data, title, filename, authWidth}) => {
  const wb = XLSX.utils.book_new()
  const arr = json_to_array(key, data)
  arr.unshift(title)
  const ws = XLSX.utils.aoa_to_sheet(arr)
  if (authWidth) {
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, filename + '.xlsx')
}

/*
* @param[key] Array  ['name', 'age']
* @param[title] Array ['姓名', '年龄']
* @param[data] Object
* @param[filename] String
* @param[authWidth] Bollean
* */
export const exportJsonToExcel = ({key, data, title, filename, authWidth}) => {
  const wb = XLSX.utils.book_new()
  data.unshift(title)
  const ws = XLSX.utils.json_to_sheet(data, {header: key, skipHeader: true})
  if (authWidth) {
    const arr = json_to_array(key, data)
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, filename + '.xlsx')
}
