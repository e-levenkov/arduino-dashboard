const socket = require("socket.io-client")("https://fathomless-meadow-20395.herokuapp.com/")
const SerialPort = require('serialport')
const ReadLine = SerialPort.parsers.Readline

const port = new SerialPort('COM3',{
    boudRate: 9600
})
const parser = port.pipe(new ReadLine({delimiter: '\r\n'}))
console.log('readline = ', ReadLine)

socket.on("connect", function(){
    console.log('Connected to server')

    parser.on('data', function(data){
        let sendObj;
        let dataArr;
        dataArr = data.split(',')
        sendObj = {
            humidity: dataArr[0],
            temp: dataArr[1]
            ,
            soil: dataArr[2]
        }
        // console.log('sendObj = ', sendObj)
        socket.emit('temp', sendObj)
        // setInterval(() => socket.emit('temp', sendObj), 3000);
        
    })
    socket.on('disconnect', () => console.log('Client disconnected'))
})

