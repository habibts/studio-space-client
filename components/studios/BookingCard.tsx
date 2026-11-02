"use client";

import { useState } from "react";
import { Calendar, DollarSign, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Studio } from "@/components/studios/StudioCard";

interface BookingCardProps {
  studio: Studio;
}

export default function BookingCard({ studio }: BookingCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const hours =
    startTime && endTime
      ? Math.max(
          0,
          (new Date(`2000-01-01T${endTime}`).getTime() -
            new Date(`2000-01-01T${startTime}`).getTime()) /
            3600000
        )
      : 0;

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="size-4" />
            <span>Hourly Rate</span>
          </div>
          <span className="font-medium">${studio.hourlyRate}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="size-4" />
            <span>Security Deposit</span>
          </div>
          <span className="font-medium">${studio.securityDeposit || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="size-4" />
            <span>Max Capacity</span>
          </div>
          <span className="font-medium">{studio.maxCapacity || "N/A"}</span>
        </div>

        <Separator />

        <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
          <DialogTrigger className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Calendar className="mr-2 size-4" />
            Book Workspace Now
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Booking Request</DialogTitle>
              <DialogDescription>Fill in your booking details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Booking Date</label>
                <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">End Time</label>
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Number of Hours</span>
                <span className="font-medium">{hours}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-medium">${studio.hourlyRate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Security Deposit</span>
                <span className="font-medium">${studio.securityDeposit || 0}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
                <span>Total Estimated Price</span>
                <span className="text-amber-500">
                  ${((studio.hourlyRate || 0) * hours + (studio.securityDeposit || 0)).toFixed(2)}
                </span>
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button
                onClick={() => {
                  if (!bookingDate || !startTime || !endTime || hours <= 0) return;
                  setBookingOpen(false);
                }}
                className="bg-amber-500 text-white hover:bg-amber-600"
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}