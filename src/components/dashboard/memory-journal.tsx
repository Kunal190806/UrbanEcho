"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveMemoryAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, BookHeart, Info, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock user data and state management for local development
const mockUser = { uid: 'local-user-123', displayName: 'Jane Doe' };
const useUser = () => ({ user: mockUser, isLoading: false }); // Always logged in for this component's context

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookHeart className="mr-2 h-4 w-4" />}
      Save Memory
    </Button>
  );
}

export function MemoryJournal() {
  const { user } = useUser();
  const [memories, setMemories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialState = { message: "", errors: {}, data: null };
  const [state, dispatch] = useActionState(saveMemoryAction, initialState);

  const [formKey, setFormKey] = useState(Date.now());
  
  useEffect(() => {
    // Simulate fetching memories
    setTimeout(() => {
      setMemories([
        { id: '1', placeName: 'Café Aranya, Goa', notes: 'for dinner' },
        { id: '2', placeName: 'India Gate', notes: 'Evening walk' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (state.message.startsWith("Successfully") && state.data) {
      // Add new memory to local state
      setMemories(prevMemories => [{ id: Date.now().toString(), ...state.data }, ...prevMemories]);
      // Reset form on success
      setFormKey(Date.now());
    }
  }, [state]);


  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Memory Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Please Sign In</AlertTitle>
            <AlertDescription>
              You need to be signed in to save and view your memories.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Memory Journal</CardTitle>
          <CardDescription>
            Save a memorable place with a simple command.
          </CardDescription>
        </CardHeader>
        <form action={dispatch} key={formKey}>
          <CardContent className="space-y-4">
            <input type="hidden" name="userId" value={user.uid} />
            <div className="space-y-2">
              <Label htmlFor="command">Your Command</Label>
              <Input
                id="command"
                name="command"
                placeholder='e.g., "Save Cafe Flora for brunch"'
                required
              />
              {state.errors?.command && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.command[0]}
                </p>
              )}
            </div>

            {state.message && (
              <Alert variant={state.message.startsWith("Successfully") ? "default" : "destructive"}>
                {state.message.startsWith("Successfully") ? <CheckCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                <AlertTitle>{state.message.startsWith("Successfully") ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Saved Memories</CardTitle>
          <CardDescription>Places you've saved.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />}
          {!isLoading && memories && memories.length > 0 && (
            <ul className="space-y-4">
              {memories.map((memory: any) => (
                <li key={memory.id} className="rounded-lg border p-4">
                  <p className="font-semibold">{memory.placeName}</p>
                  {memory.notes && (
                    <p className="text-sm text-muted-foreground">{memory.notes}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!isLoading && (!memories || memories.length === 0) && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
                <BookHeart className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                    You haven't saved any memories yet.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
