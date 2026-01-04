"use server";

import { UserProps } from "@/types/types";

export async function createUser(data: UserProps) {
  console.log("Creating user:", data);
  // Simulate API call or database operation
  // Return success or error status mimicking the user's code expectation { status: number, error?: string }
  try {
     // Checking if user exists logic would go here
     const isEmailTaken = false; 
     if (isEmailTaken) {
        return { status: 409, error: "Email already exists" };
     }
     
     // Create user logic
     return { status: 200, data: { ...data, id: "123" } };
  } catch (error) {
     return { status: 500, error: "Failed to create user" };
  }
}