import React from "react";
import Logo from "./Logo";
import Box from "./Box";

export default function Footer() {
  return (
    <Box className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Logo className="mb-4 md:mb-0" />
        <div className="text-center md:text-right">
          <p className="text-gray-400">
            &copy; 2023 MovieMagic. All rights reserved.
          </p>
        </div>
      </div>
    </Box>
  );
}
