import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@sarthaktech/medium-common'


export const postRouter = new Hono<{ 
  Bindings : {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

postRouter.use('/*',async (c, next)=>{
  try{ 
    const header = c.req.header("Authorization") || "";
    const response = await verify(header, c.env.JWT_SECRET);

    if(!response){
      c.status(401);
      return c.json({error: "unauthorized"});
    }
    //@ts-ignore
    c.set("userId", response.id);
    await next();
  }
  catch (e){
    c.status(401);
    return c.json({error: "unauthorized access"});
  }
})

postRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          error: "Wrong inputs",
        });
      }
    const userId = c.get("userId"); 

    const blog= await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    return c.json({
        id: blog.id,
    })
});
postRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        error: "Wrong inputs",
        });
    }

    const blog= await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id,
    })
});
postRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true,
                }
            }
        }});
    //Todo: Pagination
    return c.json({
        blogs,
    })
});
postRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = await c.req.param("id");

    try {
        const blog= await prisma.post.findFirst({
            where:{
                id: id,
            },
            select:{
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json({
            blog,
        })
    } catch (e){
        c.status(411);
        return c.json({
            message: "error while fetching blog posts"
        })
    }
});





