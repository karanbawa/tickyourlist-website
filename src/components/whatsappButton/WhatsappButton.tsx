"use client";

import React from 'react';
import ButtonPrimary from "@/shared/ButtonPrimary";
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsappButtonProps {
  tourGroupUrl: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ tourGroupUrl }) => {
  const handleWhatsappRedirect = () => {
    console.log("whatsapptest ");
    const phoneNumber = "+918588938349"; // replace with the WhatsApp number you want to send the message to
    const message = `Hello, I'm interested in personalized itineraries and vacation planning. Here is the link: https://tickyourlist.com/${tourGroupUrl}`;
    const encodedMessage = encodeURIComponent(message);

    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <ButtonPrimary
      style={{ backgroundColor: "#2c9e71" }} // WhatsApp brand color
      icon={<FaWhatsapp size={20} color="#fff" />} // Pass the WhatsApp icon
      onClick={handleWhatsappRedirect}
    >
      Chat on WhatsApp
    </ButtonPrimary>
  );
};

export default WhatsappButton;
