import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
  });

  return new Response(JSON.stringify(todos));
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { title } = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title,
      userId: session.user.id,
    },
  });

  return new Response(JSON.stringify(todo));
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id, completed } = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return new Response(JSON.stringify(updatedTodo));
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id } = await req.json();

  await prisma.todo.delete({ where: { id } });

  return new Response("Deleted Successfully");
}
