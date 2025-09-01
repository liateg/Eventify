import { PrismaClient } from "@prisma/client";
import { success } from "zod";
import { da } from "zod/locales";
const prisma = new PrismaClient();

const postEvent=async (req,res)=>{
    try{
        

const {
  title,
  description,
  date,
  location,
  poster,
  category,
  status,
  organizerId,
  ticketType,
  ticketPrice,
  ticketQty,
} = req.body;
console.log(`input ${req.body}`)
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
    status,
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
return res.status(201).json({success:true,data:event})

    }catch(error){
        return res.status(401).json({success:false,erroe:error.message})
    }

}