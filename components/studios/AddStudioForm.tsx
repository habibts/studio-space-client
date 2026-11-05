"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";

import {
    Building2,
    MapPin,
    DollarSign,
    Users,
    ImagePlus,
    Wifi,
    Car,
    Wind,
    Lightbulb,
    Volume2,
    Shirt,
    Utensils,
    Camera,
    Save,
} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const amenitiesList = [
    { name: "Wi-Fi", icon: Wifi },
    { name: "Parking", icon: Car },
    { name: "Air Conditioning", icon: Wind },
    { name: "Professional Lighting", icon: Lightbulb },
    { name: "Soundproofing", icon: Volume2 },
    { name: "Changing Room", icon: Shirt },
    { name: "Kitchen", icon: Utensils },
    { name: "Equipment Available", icon: Camera },
];

const studioSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().min(1, "Please select a category"),
    hourlyRate: z.coerce.number().positive("Enter a valid hourly rate"),
    securityDeposit: z.coerce
        .number()
        .min(0, "Security deposit cannot be negative"),
    maxCapacity: z.coerce
        .number()
        .int()
        .positive("Capacity must be at least 1"),
    location: z.string().min(5, "Please enter a valid address"),
    imageUrl: z.string().url("Please enter a valid image URL"),
    description: z.string().min(20, "Minimum 20 characters required"),
    amenities: z.array(z.string()),
});

type StudioFormValues = z.infer<typeof studioSchema>;

export default function AddStudioForm() {
    const router = useRouter();
    const { user, isPending } = useCurrentUser();
    const [imagePreview, setImagePreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<StudioFormValues>({
        // zod's z.coerce fields have input type `unknown`, so the resolver's input
        // type differs from the form's value type — align them on the output type.
        resolver: zodResolver(studioSchema) as Resolver<StudioFormValues>,
        defaultValues: {
            title: "",
            category: "",
            hourlyRate: 1,
            securityDeposit: 0,
            maxCapacity: 1,
            location: "",
            imageUrl: "",
            description: "",
            amenities: [],
        },
    });

    const onSubmit = async (data: StudioFormValues) => {
        if (!user) {
            toast.add({ title: "Please log in", description: "You must be logged in to add a studio.", type: "error" });
            return;
        }
        setIsSubmitting(true);
        try {
            console.log("Form submitted with data:", data);

            const studioData = {
                ...data,
                amenities: data.amenities || form.getValues("amenities") || [],
                hostName: user.name || "",
                hostEmail: user.email || "",
            };

            console.log("Sending studio data:", studioData);

            await fetch("/api/auth/jwt", { credentials: "include" });
        const res = await fetch("http://localhost:3001/add-studio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(studioData),
        });

            console.log("Response status:", res.status);

            const result = await res.json();
            console.log("Response data:", result);

            if (!res.ok) {
                throw new Error(result.message || "Failed to add studio");
            }

            toast.add({ title: "Studio added successfully!", type: "success" });

            console.log("Saved Studio:", result);

            form.reset();
            router.push("/my-listings");

        } catch (error) {
            console.error("Error submitting studio:", error);

            toast.add({
                title: "Failed to add studio",
                description: error instanceof Error ? error.message : "Something went wrong!",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-cyan-600" />
                            Basic Information
                        </CardTitle>
                        <CardDescription>
                            Provide the basic details of your creative space.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-5 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Studio Title *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Premium Photography Studio"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Studio Category *</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="Photo Studio">
                                                Photo Studio
                                            </SelectItem>
                                            <SelectItem value="Film Stage">
                                                Film Stage
                                            </SelectItem>
                                            <SelectItem value="Podcast Lounge">
                                                Podcast Lounge
                                            </SelectItem>
                                            <SelectItem value="Music Suite">
                                                Music Suite
                                            </SelectItem>
                                            <SelectItem value="Workshop">
                                                Workshop
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Detailed Overview *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your studio and its facilities..."
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Pricing & Capacity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Pricing & Capacity
                        </CardTitle>
                        <CardDescription>
                            Set your pricing and maximum visitor capacity.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-5 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="hourlyRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hourly Rate ($) *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder="50"
                                            {...field}
                                            onChange={(event) =>
                                                field.onChange(event.target.valueAsNumber)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="securityDeposit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Security Deposit ($) *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="100"
                                            {...field}
                                            onChange={(event) =>
                                                field.onChange(event.target.valueAsNumber)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maxCapacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Capacity *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder="10"
                                            {...field}
                                            onChange={(event) =>
                                                field.onChange(event.target.valueAsNumber)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            Studio Location
                        </CardTitle>
                        <CardDescription>
                            Provide the complete address of your studio.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123 Main Street, New York, USA"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Image */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImagePlus className="h-5 w-5 text-purple-600" />
                            Studio Image
                        </CardTitle>
                        <CardDescription>
                            Add a high-quality image of your workspace.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="https://example.com/studio.jpg"
                                            {...field}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                setImagePreview(event.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {imagePreview && (
                            <div className="overflow-hidden rounded-xl border">
                                <img
                                    src={imagePreview}
                                    alt="Studio preview"
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Amenities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Studio Amenities
                        </CardTitle>
                        <CardDescription>
                            Select all available facilities.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <FormField
                            control={form.control}
                            name="amenities"
                            render={() => (
                                <FormItem>
                                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                                        {amenitiesList.map((amenity) => {
                                            const Icon = amenity.icon;

                                            return (
                                                <div
                                                    key={amenity.name}
                                                    className="flex items-center gap-3 rounded-lg border p-4"
                                                >
                                                    <Checkbox
                                                        id={amenity.name}
                                                        checked={
                                                            form.watch("amenities") instanceof Array
                                                                ? form.watch("amenities").includes(amenity.name)
                                                                : false
                                                        }
                                                        onCheckedChange={(checked) => {
                                                            const current = form.getValues("amenities") || [];

                                                            const updated = checked
                                                                ? [...current, amenity.name]
                                                                : current.filter((item) => item !== amenity.name);

                                                            form.setValue("amenities", updated, { shouldValidate: true });
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={amenity.name}
                                                        className="flex cursor-pointer items-center gap-2 text-sm"
                                                    >
                                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                                        {amenity.name}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Host Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Host Information</CardTitle>
                        <CardDescription>
                            Your account information will appear here.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Host Name</Label>
                            <Input value={user?.name || ""} readOnly />
                        </div>

                        <div className="space-y-2">
                            <Label>Host Email</Label>
                            <Input value={user?.email || ""} readOnly />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save Studio"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}