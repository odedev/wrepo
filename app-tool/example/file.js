

export const getFile = (req, res) => {
  // 引入文件
  let fileUrl = './public/demo.pdf'
  // 允许跨域
  // res.header("Access-Control-Allow-Origin", "*");
  // 设置请求头
  res.writeHead(200, {
    // 指定文件类型
    // xlsx
    // 'Content-Type':"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // docx
    // 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // pdf
    'Content-Type': 'application/pdf;charset=UTF-8',
  })
  //创建可读流
  let readStream = fs.createReadStream(fileUrl)
  // // 将读取的结果以管道pipe流的方式返回
  readStream.pipe(res)
}
