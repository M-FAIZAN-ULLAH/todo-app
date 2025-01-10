import prisma from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos));
}

export async function POST(req) {
  const { title, userId } = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title,
      userId,
    },
  });

  return new Response(JSON.stringify(todo));
}
