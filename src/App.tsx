import { Button } from "./components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { BadgeCheck, Loader2 } from "lucide-react"
import { toast } from "sonner"

 
const formSchema = z.object({
  firstName: z.string().max(30).min(1, "First Name is required"),
  lastName: z.string().max(30).min(1, "Last Name is required"),
  username: z.string().max(15).min(3, "Username is required"),
  email: z.string().email(),
  newPassword: z.string().max(20).min(8, "Password must be atleast 8 chars"),
  confirmPass: z.string().max(20).min(8, "Password must be atleast 8 chars"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
  gender: z.string().refine((value) => ["Male", "Female", "Other"].includes(value), {message: "Enter some value"}),
  country: z.string().refine((value) => ["India", "Pakistan", "Other"].includes(value), {message: "Enter some value"}),
})
.refine((data) => data.newPassword === data.confirmPass, {
  message: "Passwords don't match",
  path: ["confirmPass"],
});


function App() {
  const [loading, setLoading] = useState<boolean>(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    username: "",
    email: "",
    newPassword: "",
    confirmPass: "",
    phone: "",
    gender: "",
    country:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    // const response = await fetch("https://example.org/post", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    // });
    setTimeout(() => {
      setLoading(false)
      console.log(values)
      // toast.success("You have been registered successfully.")
      toast(
      <div className="flex gap-3 items-center">
        <BadgeCheck className="text-green-500 text-lg" />
        <p className="text-sm">You have been registered successfully</p>
      </div>)
    }, 5000);

    // if (!response.ok) {
    //   throw new Error(`Response status: ${response.status}`);
    // }

    // const responsejson = response.json()
    // console.log(responsejson)
  }
  return (
    <>
    <div className="flex flex-col p-16 min-h-screen">
      <h1 className="text-4xl mb-10 font-bold">Form 2 - ShadCN</h1>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-1/2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Write your first name here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Write your last name here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Username</FormLabel>
              <FormControl>
                <Input placeholder="Username..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Set your username here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Write your email here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">New Password</FormLabel>
              <FormControl>
                <Input placeholder="New Password..." {...field} type="password"/>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Set your password here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm Password..." {...field} type="password"/>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Confirm your password here.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1 basis-0">
                <FormLabel className="">Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  Write your gender here.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1 basis-0">
                <FormLabel className="">Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country" className=""/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  Write your country here.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        {loading ? (<Button className="w-[100%] select-none" disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>) : <Button type="submit" className="w-[100%] select-none" variant="default">Submit</Button>}
        
      </form>
    </Form>
    </div>
    </>
  )
}

export default App
