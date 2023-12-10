import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import SignOut from "./components/signOut";
import { deleteTodoById, readTodo, updateTodoById } from "./actions";

export default async function Page() {
  const { data: userSes } = await readUserSession();

  if (!userSes.session) {
    return redirect("/auth-server-action");
  }

  const { data: todos } = await readTodo();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 space-y-5">
        <CreateForm />

        {/* {JSON.stringify(data.session)} */}

        <SignOut />

        {todos?.map((todo, index) => {
          const deleteTodo = async (id: string): Promise<void> => {
            "use server"
            const result = await deleteTodoById(id);
            console.log(result);
          };

          const deleteTodoByIdFunc = deleteTodo.bind( null, todo.id, ) as unknown as string;

          const updateTodo = async (
            id: string,
            completed: boolean,
          ): Promise<void> => {
            "use server"
            const result = await updateTodoById(id, completed);
            console.log(result);
          };

          const updateTodoByIdFunc = updateTodo.bind(
            null,
            todo.id,
            !todo.completed,
          ) as unknown as string;

          return (
            <div key={index} className="flex items-center gap-6">
              <h1
                className={cn({
                  "line-through": todo.completed,
                })}
              >
                {todo.title}
              </h1>

              <form action={deleteTodoByIdFunc}>
                <Button>delete</Button>
              </form>
              <form action={updateTodoByIdFunc}>
                <Button>Update</Button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
