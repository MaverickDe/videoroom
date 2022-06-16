const { Console } = require("console")
const express = require("express")
// const { contentType } = require("express/lib/response")
const app = express()

const http = require("https")
const path = require("path")
// const app2 = http.createServer(app)
let port =process.env.PORT || 5000

const io = require('socket.io')(app.listen(port))
app.use(express.static("public"));

// app2.listen("5000")






app.get("/",(req,res)=>{
    // res.writeHead({contentType:"text/html"})
    res.sendFile(__dirname+"/home.html")
})


let user = {}
let soc;
io.on("connection", async socket=>{
    // console.log("user_connected")
    // if(!soc){
    //     soc=socket

    // }else{
    //     console.log(socket == soc)

    // }

   
    
    

    // socket.emit("insession",JSON.stringify({session:"___"}))
    // socket.on("insession",_e=>{
    //     let e=JSON.parse(_e)
    //     if(e.id && e.roomid){

    //      let room =   findroom(socket)
    //      socket.information=e.  myinformation
    //     }


    // })
    // console.log(io.sockets.in("W"))
    // user.push(name)
    socket.on("join-room",async(e)=>{
        try{

         await   joincall(socket,e)
        }catch(e){
            msg(socket,"err",{type:"refresh",err:"An err Ocurred ,things to try 1. try rejoining the room 2.  check if the room  id is correct 3. inputs are correctly filled 4. refresh your page"})

        }
      
      
        
        
    })
    socket.on("create-room",async (e)=>{
        // if()
        // const data = JSON.parse(e.utf8Data)
        // if(Object.values!=)
        // console.log(e)
        try{

         await   createcall(socket,e)
        }catch(e){
            msg(socket,"err",{type:"refresh",err:"An err Ocurred try creating the room"})

        }
      
        
    })



// let soc =socket
    // socket.j="DD"
    // console.log(socket.j)
    
    // io.in("df").fetchSockets().then(e=>{
    //     e.forEach(e=>{
    //         e.emit("df",JSON.stringify({ff:"F"}))
    //         console.log(e)
    //     })
    //     ;})
  

    

    socket.on("exit_room",(e)=>{
      
        
        leaveroom(socket)




    })


    
    socket.on("closeroom",async (e)=>{
       
        
        try{

          await   closeroom(socket,e)
        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred try refreshing the page"})

        }
       




    })
    

    



    socket.on("userleft",async e=>{
        // console.log(e)
        try{
          await   userleft(socket,e)

        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred try refreshing the page"})

        }

    })
    socket.on("message",async e=>{
        // console.log(e)
        try{
            let _e=JSON.parse(e)
            await (checkobj(_e))
          
          msg(socket,"message",_e)

        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred try rejoining the room"})

        }

    })
    socket.on("iceCandidate",async e=>{
       try{

           let _e=JSON.parse(e)
           await checkobj(_e)
           // console.log(_e ,"_____rrrrrr")
         let user =  await finduser(socket,e)
       //   console.log(user)
         msg(user,"iceCandidate",_e)
        }catch(e){
            msg("err",{type:"normal",err:"An err Ocurred exchangin handshake"})

        }
    //   console.log(_e.id,_e.senderid,"ice")

    })
    socket.on("offer", async e=>{
        // console.log(e)
        try{

            let _e=JSON.parse(e)
            await checkobj(_e)
          let user = await  finduser(socket,e)
        //   console.log(user)
        // console.log(_e.id,_e.senderid,"offer")
       
    
            msg(user,"offer",_e)
        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred exchangin handshake"})

        }
       
    

    })

   

        socket.on("answer",async e=>{

            try{
                let _e=JSON.parse(e)
                await checkobj(_e)
              let user = await  finduser(socket,e)
            //   console.log(user)
              msg(user,"answer",_e)

            }catch(e){
                msg(socket,"err",{type:"normal",err:"An err Ocurred exchangin handshake"})
    
            }
        //   console.log(_e.id,_e.senderid,"answer")
       
        })
  
// console.log(socket)
    socket.on("negotiateoffer",async e=>{

        try{

            let _e=JSON.parse(e)
            await checkobj(_e)
          let user = await  finduser(socket,e)
          msg(user,"negotiateoffer",_e)
        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred exchangin handshake"})

        }
   
    })

    
    socket.on("negotiateanswer",async e=>{
        try{

            let _e=JSON.parse(e)
            await checkobj(_e)
          let user = await  finduser(socket,e)
          msg(user,"negotiateanswer",_e)
        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred exchangin handshake"})

        }
   
    })


    socket.on("block",async (e)=>{
        try{
            let _e=JSON.parse(e)
            let user = await  finduser(socket,e)
            msg(user,"notification",{notification:"you have being blocked"})
            // user.leave("")
            msg(user,"block",_e)

        }catch(e){
            msg(socket,"err",{type:"normal",err:"An err Ocurred "})
        }
    })
    


    // socket.on("disconnect",(reason,des)=>{
    // //    console.log(reason,des)
    //     // userleft(e)
    // })



























    // if(socket.information ){
    //   socket.join(socket.information.roomid)
    //     // socket.leave(socket.information.roomid)
    // }


    socket.on("disconnect",(reason,des)=>{
        console.log(reason,des,socket.information)

        if(socket.information && socket.information.type=="create_call"){
            closeroom(socket,JSON.stringify(socket.information))
            // socket.leave(socket.information.roomid)
        }
        if(socket.information&&socket.information.type=="join_call"){
            JSON.stringify
            userleft(socket,JSON.stringify(socket.information))

            // socket.leave(socket.information.roomid)
        }
    })



    
})


async function userleft(socket,e){
     let _e=JSON.parse(e)
     if(!checkobj(e)){
        throw("err")
    }
     console.log("userleft")
    // console.log(_e ,"_____rrrrrr")
//   let user =  await finduser(socket,e)
 socket.leave(
      socket.information.roomid)

      io.sockets.in(socket.information.roomid).emit("userleft",JSON.stringify({name:socket.information.name,id:socket.information.id}))
console.log(socket.information.id,"iddd")
      msg(socket,"allusernotification",{notification:`${socket.information.name } left the room`})
  
}


async function joincall(socket,_e){
    let e=JSON.parse(_e)
    if(!checkobj(e)){
        throw("err")
    }
    console.log(e)
    
    let id = new Date().getTime()
    let room = await io.in(e.roomnameid).fetchSockets()
    // console.log(room)
    if(room==" "){
        console.log("nullllllllllllll")
       throw("err")
        // return
    }
    socket.join(e.roomnameid)
    // msg(socket,"roomid",{roomid:e.roomnameid,myid:id})
//    console.log(room)
//  room.push({name:e.name,roomid:e.roomnameid,id,socket,type:"join_call"})
 socket.information={name:e.name,roomid:e.roomnameid,id,type:"join_call"}

 let master=room.find(e=>e.information.type=="create_call")
 if(!master){
    throw("err")
}

 console.log(master.information.id,id,"infomation")
 let masterid = master.information.id
 console.log(masterid,id,"master")

 room.forEach(e=>{
     if(e.information.type!="create_call" && e.information.name!=socket.information.name){
        socket.emit("name",JSON.stringify({name:e.information.name,id:e.information.id}))
     }

 })
 io.sockets.in(e.roomnameid).emit("name",JSON.stringify({name:e.name,id}))
 socket.information.description=master.information.description
 socket.information.roomname=master.information.roomname
 msg(socket,"myinformation",{myinformation:socket.information})
 msg(socket,"masterid",{masterid,name:master.information.name,type:"master"})
 msg(master,"incoming_user",{id})
//  msg(socket,"name",{})
 msg(socket,"allusernotification",{notification:"new user connected"})
 console.log(id,"iddddd")
 



}



function checkobj(_e){
    if(Object.values(_e)==""){
        return false
        
    }
 let gg =   Object.values(_e).find(e=>e=="")
//  console.log(gg,"gg")
 if(gg!=undefined){
     return false
 }
return true
}

console.log(!checkobj({aa:"a",a:""}))





async function createcall(socket,e){

    let _e=JSON.parse(e)
    if(!checkobj(_e)){
        console.log("ggggggg")
        throw("err")
    }
   
    console.log(_e,!checkobj(e))
    
    let roomid  = new Date().getTime().toString()+Math.random().toString()
    let id  = new Date().getTime()
    socket.join(roomid)
    // console.log(io.sockets)
    // console.log(id)
    // user[roomid]=[]

    
    socket.information = {name:_e.name,type:"create_call",id,roomid,roomname:_e.roomnameid ,description:_e.description}
    msg(socket,"myinformation",{myinformation:socket.information})

    // await finduser(socket,)
    // user[roomid].push({socket,type:"host"})
    // console.log(user)

}


// async function leaveroom(socket,e){
//     if(Object.values(e)==""){
//         throw("err")
//     }
    
   
//     // let user_= await finduser(socket,e)
//     io.sockets.in(socket.information.roomid).emit("closeroom",{})
//     msg(socket,"allusernotification",{notification:`${_e.name} has left the room`})
    
//     room = socket.in.roomid
//         socket.leave(room)
       
  
// }


async function  closeroom(socket,_e){
    let e=JSON.parse(_e)
    if(!checkobj(e)){
        throw("err")
    }
    
    let room =e.roomid 

    io.sockets.in(socket.information.roomid).emit("closeroom",{})

    msg(socket,"allusernotification",{notification:"this room has beeing close"})
    // io.sockets.in(room).emit("closeroom",{close:"room"})
    socket.broadcast.to(room).emit("closeroom",JSON.stringify({}))
    let room2 = await roomusers(socket)
    // console.log()
    if(room2!=""){

        room2.forEach(e=>{
            e.leave(room)
        })
    }
    
   
   
    

    

    

}








function findroom(socket){
    if(!socket.information.roomid){
        throw("err")
    }
    
   
 
// if(information.ro)
  return  socket.information.roomid
    
}






// function removeuser(socket,_e){
//     let e=JSON.parse(_e)
//     let room = findroom(_e)
//     room.forEach(e=>{
//         if(e.socket==socket){
//             user.splice(users.indexOf(e),1)
//             return
//         }
//     })

// }
function roomusers(socket){
    // if(typeof type == String){
    //     let  _type
    if(!socket.information.roomid){
        throw("err")
    }
    

  
   
   
return   new Promise(async (resolve,reject)=>{
    try{
      let room =  await   io.in(socket.information.roomid).fetchSockets()
       
        resolve( room)
    }catch(e){
        reject(undefined)

    }

})
    

}

 


function finduser(socket,_e){
    
    // if(typeof type == String){
        //     let  _type
        
        
        // }
        e =JSON.parse(_e)
        if(Object.values(e)==""){
            throw("err")
        }
        if(!socket.information){
            throw("err")
        }
    let id = e.id
    let room =socket.information.roomid
let bb = new Promise(async (resolve,reject)=>{
    try{
      let room1 =  await   io.in(room).fetchSockets()
      let user = room1.find(e=>e.information.id==id)
      user.senderinfo=socket.information
        resolve(user )
    }catch(e){
        resolve(undefined)

    }

})
   
return   bb 
    

}

 



function msg(socket,type,msg){
    
    // console.log(msg)
if(socket.senderinfo){
    // console.log(socket.senderinfo)

    // let user =  finduserwithsocket(e,socket)

    msg.id=socket.senderinfo.id
    console.log(msg.id)
    socket.senderinfo=undefined
    // msg.sendename=socket.senderinfo.name
    // console.log(user.id)
}
// else if(socket.information){
//     msg.id=socket.information.id
//     // msg.name=socket.information.name

// }
   if(type=="message" || type =="allusernotification" ){

       socket.broadcast.to(socket.information.roomid).emit(type,JSON.stringify(msg))
       return
}
socket.emit(type,JSON.stringify(msg))

}


// console.log(app.listen("5000"))
// console.log( )
// console.log(app.)





// var dd = function (k){
//     console.log(this)
// }
// dd.kk = function() {
//     console.log(this)

// }

// let bb = dd.kk
// console.log(

//     bb.bind({dd})()
// )

// dd("k")