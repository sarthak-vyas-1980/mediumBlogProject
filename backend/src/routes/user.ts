import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { signupInput, SignupInput, signinInput } from '@sarthaktech/medium-common'
import * as bcrypt from 'bcryptjs'; 


export const userRouter = new Hono<{ 
  Bindings : {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// userRouter.post('/signup',async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   const body = await c.req.json();
//   const { success } = signupInput.safeParse(body);
//   if(!success){
//     c.status(411);
//     return c.json({
//       error: "Wrong Inputs",
//     });
//   }
//   try{
//     const newUser = await prisma.user.create({
//       data:{
//         email: body.email,
//         password: body.password,
//         name: body.name,
//       }
//     })
//     const jwt = await sign({ id: newUser.id } as { id: string | number }, c.env.JWT_SECRET);
    
//     // Return token directly (matching frontend expectations)
//     return c.json({
//       token: jwt, // Renamed 'jwt' to 'token' for clarity and frontend matching
//     });
    
//   } catch (e: unknown) {
//     // FIX 2: Check for specific Prisma errors (e.g., duplicate email)
//     if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
//         c.status(409); // 409 Conflict for duplicate unique fields (email)
//         return c.json({ error: "Email already exists. Please sign in." });
//     }

//     // FIX 3: Catch all other unexpected server errors
//     console.error("Signup error:", e);
//     c.status(500); // 500 Internal Server Error
//     return c.json({
//       error: "An unexpected server error occurred.",
//     });
//   }
// })
userRouter.post('/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  
  if(!success){
    c.status(400); // 400 Bad Request for bad input format
    return c.json({
      error: "Invalid input fields.",
    });
  }
  const data = body as SignupInput; 

  try{
    // 🔥 FIX 1: Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = await prisma.user.create({
      data:{
        email: data.email,
        password: hashedPassword, // 🔥 Using the hashed password
        name: data.name,
      }
    })
    
    const jwt = await sign({ id: newUser.id } as { id: string | number }, c.env.JWT_SECRET);
    
    return c.json({
      token: jwt,
    });
    
  } catch (e: unknown) {
    // Check for specific Prisma errors (e.g., duplicate email: P2002)
    if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
        c.status(409); // 409 Conflict
        return c.json({ error: "Email already exists. Please sign in." });
    }

    // Catch all other unexpected server errors, which includes issues with hashing/database connection
    console.error("Signup error:", e);
    c.status(500); // 500 Internal Server Error
    return c.json({
      error: "An internal server error occurred during signup.",
      details: (e as Error).message, // Added details for better debugging
    });
  }
})
userRouter.post('/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error: "Wrong inputs",
    });
  }
  const userNew = await prisma.user.findUnique({
    where:{
      email: body.email,
    }
  })
  if(!userNew){
    c.status(403);
    return c.json({
      error: "user not found"
    })
  }
  const token = await sign({ id: userNew.id }, c.env.JWT_SECRET)
  return c.json({
    token,
  })
})