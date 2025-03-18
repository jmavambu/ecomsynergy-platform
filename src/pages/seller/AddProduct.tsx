
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SellerDashboardLayout from '@/components/SellerDashboardLayout';
import Button from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

// Form schema for product
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number.",
  }),
  category: z.string({
    required_error: "Please select a product category.",
  }),
});

const AddProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const isEditMode = !!id;
  
  // Initialize form
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: ""
    }
  });
  
  // For edit mode, fetch product data
  useEffect(() => {
    if (isEditMode) {
      // This would be replaced with an API call to fetch the product
      // For now using mock data
      const mockProduct = {
        id: id,
        name: "Sample Product",
        description: "This is a sample product description.",
        price: "29.99",
        stock: "10",
        category: "electronics",
        images: ["https://placehold.co/600x400/png"]
      };
      
      form.reset({
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        category: mockProduct.category,
      });
      
      setImages(mockProduct.images);
    }
  }, [isEditMode, id, form]);
  
  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    // This would be an API call to create/update the product
    console.log({
      ...values,
      price: parseFloat(values.price),
      stock: parseInt(values.stock),
      images
    });
    
    toast({
      title: isEditMode ? "Product Updated" : "Product Created",
      description: isEditMode 
        ? "Your product has been updated successfully." 
        : "Your product has been created successfully.",
    });
    
    navigate('/seller/products');
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    // In a real app, you would upload these files to your storage service
    // and get back URLs. For this mockup, we'll use local URLs.
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  return (
    <SellerDashboardLayout title={isEditMode ? "Edit Product" : "Add New Product"}>
      <div className="bg-card rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter product description" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
              </div>
              
              <div className="space-y-4">
                <div>
                  <FormLabel>Product Images</FormLabel>
                  <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="product-images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="product-images" 
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium mb-1">Drag files to upload</span>
                      <span className="text-xs text-muted-foreground">or click to browse</span>
                    </label>
                  </div>
                </div>
                
                {images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Images</p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img 
                            src={image} 
                            alt={`Product image ${index + 1}`} 
                            className="h-full w-full object-cover rounded-md" 
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 text-white rounded-md transition-opacity"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 justify-end pt-4">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate('/seller/products')}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </SellerDashboardLayout>
  );
};

export default AddProduct;
