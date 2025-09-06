import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
// const upload = multer({ dest: 'uploads/' })


export const postEvent=async (req,res)=>{
    try{
       const poster = req.file.filename;  
     console.log("req.body:", req.body);

let {
  title,
  description,
  date,
  location,
  category,
  
  organizerId,
  ticketType,
  ticketPrice,
  ticketQty,
} = req.body;
console.log("Types:");
console.log({
  title: typeof title,
  description: typeof description,
  location: typeof location,
  category: typeof category,
  
  organizerId: typeof organizerId,
  ticketType: typeof ticketType,
  ticketPrice: typeof ticketPrice,
  ticketQty: typeof ticketQty
});


console.log("req.body:", req.body);
ticketType = Array.isArray(ticketType) ? ticketType : [ticketType];
console.log(Array.isArray(ticketType))
ticketPrice = Array.isArray(ticketPrice) ? ticketPrice : [ticketPrice];
ticketQty = Array.isArray(ticketQty) ? ticketQty : [ticketQty];
const tickets = ticketType.map((type, i) => ({
  type: type || "General",
  price: Number(ticketPrice[i]),
  quantity: Number(ticketQty[i]),
}));

console.log(`tickets ${tickets}`)
const event = await prisma.event.create({
  data: {
    title,
    description,
    date: new Date(date),
    location,
    poster,
    category,
   
    organizer: {
      connect: { id: organizerId }, // must match User.id
    },
    tickets: {
      create: tickets, // array of ticket objects
    },
  },
  include: {
    tickets: true, // optional: return tickets
    organizer: true, // optional: return organizer
  },
});
console.log(event)
// return res.status(201).json({success:true,data:event})
return res.redirect("/org/myevents")
    }catch(error){
        return res.status(401).json({success:false,error:error.message})
    }

}

export const editPost = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      date,
      location,
      poster,
      category,
      status,
      organizerId,
      ticketId,     // array of ticket IDs
      ticketType,
      ticketPrice,
      ticketQty,
    } = req.body;
console.log(req.params.id)
    // Update event
    const event = await prisma.event.update({
      where: { id: req.params.id || id }, // or req.body.eventId
      data: {
        title,
        description,
        date: new Date(date),
        location,
        poster,
        category,
        status,
      },
      include: {
        organizer: true,
      },
    });

    // Prepare tickets array with IDs
    const tickets = ticketId.map((id, i) => ({
      id,
      type: ticketType[i] || "General",
      price: Number(ticketPrice[i]),
      quantity: Number(ticketQty[i]),
    }));

    // Update tickets
    await Promise.all(
      tickets.map(t =>
        prisma.ticket.update({
          where: { id: t.id },
          data: { type: t.type, price: t.price, quantity: t.quantity },
        })
      )
    );

    return res.status(200).json({ success: true, data: event });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyEvents=async (req,res)=>{
const {id}=req.user
console.log(id)
try{const events=await prisma.event.findMany({
  where:{organizerId:id},
  include:{tickets:true}
})
if(events.length){
  // return res.status(201).json({success:true,data:events})
return res.render("myevents.ejs",{data:events});
}
return res.status(201).json({success:true,message:"No event created"})
}catch(error){
return res.status(401).json({success:false,error:error.message})
}

}
// //delete button
// export const deleteEvent=>async(req,res)=>{
// const {id,evetId}=req.body
// try{
// const Xevent=await prisma.event.
// }catch(error){

// }

// }
export const pauseEvent=async(req,res)=>{
  const {id,eventId}=req.body
  try{
const event=await prisma.event.update({
  where:{id:eventId},
  data:{status:"hold"}
})
return res.status(201).json({success:true,data:event})
  }catch(error){
return res.postEvent(401).json({success:false,error:error.message})
  }
}
