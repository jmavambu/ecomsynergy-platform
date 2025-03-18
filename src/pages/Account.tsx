
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Form schema for profile information
const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

// Form schema for seller information
const sellerFormSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a business category.",
  }),
  taxId: z.string().min(5, {
    message: "Tax ID must be at least 5 characters.",
  }),
});

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSeller, setIsSeller] = useState(false);

  // Mock user data - would come from auth context in real app
  const userData = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, City, State, 12345"
  };

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userData
  });

  // Seller form
  const sellerForm = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      category: "",
      taxId: ""
    }
  });

  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const onSellerSubmit = (values: z.infer<typeof sellerFormSchema>) => {
    console.log(values);
    setIsSeller(true);
    toast({
      title: "Seller Account Created",
      description: "Your seller account has been created successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-light mb-6">My Account</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Personal Information</h2>
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="mt-4">Save Changes</Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Order History</h2>
                
                <div className="rounded-lg border">
                  <div className="p-4 text-center text-muted-foreground">
                    You don't have any orders yet.
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seller">
              <div className="p-6 bg-card rounded-lg shadow-sm">
                {!isSeller ? (
                  <>
                    <h2 className="text-xl font-medium mb-4">Become a Seller</h2>
                    <p className="text-muted-foreground mb-6">Complete the form below to set up your seller account</p>
                    
                    <Form {...sellerForm}>
                      <form onSubmit={sellerForm.handleSubmit(onSellerSubmit)} className="space-y-4">
                        <FormField
                          control={sellerForm.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your business name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sellerForm.control}
                          name="businessDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Describe your business" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sellerForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Category</FormLabel>
                              <Select 
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="electronics">Electronics</SelectItem>
                                  <SelectItem value="clothing">Clothing</SelectItem>
                                  <SelectItem value="home">Home & Kitchen</SelectItem>
                                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                                  <SelectItem value="toys">Toys & Games</SelectItem>
                                  <SelectItem value="books">Books & Media</SelectItem>
                                  <SelectItem value="food">Food & Grocery</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sellerForm.control}
                          name="taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID / Business Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your tax ID" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="mt-4">Create Seller Account</Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-medium">Seller Dashboard</h2>
                      <Button onClick={() => navigate('/seller/products')}>Manage Products</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Products</h3>
                        <p className="text-2xl font-medium">0</p>
                      </div>
                      
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Sales</h3>
                        <p className="text-2xl font-medium">$0.00</p>
                      </div>
                      
                      <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Orders</h3>
                        <p className="text-2xl font-medium">0</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border">
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-medium mb-2">Ready to start selling?</h3>
                        <p className="text-muted-foreground mb-4">Add your first product to get started</p>
                        <Button onClick={() => navigate('/seller/add-product')}>Add Product</Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
