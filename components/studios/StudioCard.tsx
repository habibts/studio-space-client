"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "cn";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  location: string;
  imageUrl: string;
  description?: string;
  amenities?: string[];
  hostName?: string;
  hostEmail?: string;
  createdAt?: string;
  rating?: number | null;
}

interface StudioCardProps {
  studio: Studio;
}

export default function StudioCard({ studio }: StudioCardProps) {
  const { _id, title, category, hourlyRate, location, imageUrl, rating } = studio;

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
            priority={false}
          />
          <Badge className="absolute left-3 top-3 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/90">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
            {title}
          </h3>
          {typeof rating === "number" && rating > 0 ? (
            <Badge
              variant="outline"
              className="flex shrink-0 items-center gap-1 border-amber-200 bg-amber-50 text-amber-700"
            >
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </Badge>
          ) : null}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="mt-auto pt-2">
          <p className="text-lg font-semibold text-foreground">
            ${hourlyRate} <span className="text-sm font-normal text-muted-foreground">/ hr</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/studios/${_id}`} className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
