"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { RegisterSchema } from "@/validate/schema";
import { login_page } from "@/lib/routes";

export const RegisterComponent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loadBtn, setLoadBtn] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoadBtn(true);
    try {
      const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      const res = await fetch("/api/auth/register", payload);
      if (!res?.ok) {
        toast({
          description: res.statusText,
          variant: "errors",
        });
        setLoadBtn(false);
      }

      const result = await res.json();
      toast({
        description: result.message,
        variant: "success",
      });
      setLoadBtn(false);
      router.push(login_page);

    } catch (error) {
      toast({
        description: error,
        variant: "errors",
      });
      setLoadBtn(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="items-top flex space-x-2 mb-10">
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
              <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2 leading-none">
            <label
              htmlFor="terms"
              className="text-sm leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Yes, I understand and agree to the SpringWorks&nbsp;
              <Link
                className="font-medium underline hover:text-blue-700"
                href={login_page}
              >
                Terms of Service
              </Link>
              , including the&nbsp;
              <Link
                className="font-medium underline hover:text-blue-700"
                href={login_page}
              >
                User Agreement & Privacy Policy
              </Link>
              .
            </label>
          </div>
        </div>
        <Button className="w-full h-12" type="submit" disabled={loadBtn ? true : false}>
          {loadBtn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  );
};
