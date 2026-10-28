"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { BookingModal } from "@/components/BookingModal";

interface BookingModalContextType {
  isOpen: boolean;
  serviceName: string;
  openBookingModal: (serviceName?: string) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const openBookingModal = useCallback((service?: string) => {
    setServiceName(service?.trim() || "");
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global event delegation: allows any HTML element with data-open-booking-modal="true"
  // to open the booking modal seamlessly.
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-open-booking-modal]");
      if (target) {
        e.preventDefault();
        const service = target.getAttribute("data-service-name") || "";
        openBookingModal(service);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [openBookingModal]);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        serviceName,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
      <BookingModal
        isOpen={isOpen}
        serviceName={serviceName}
        onClose={closeBookingModal}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
