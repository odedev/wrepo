import fs from 'node:fs'


export const fileToBase64 = () => {
  fs.readFile('../asset/logo.png','binary',function(err,data){
    if(err){
        console.log(err)
    }else{
        const buffer = Buffer.from(data, 'binary');
        let src = 'data: image/'+ 'png' +';base64,' + buffer.toString('base64');
        console.log(src)
    }
  });
}
