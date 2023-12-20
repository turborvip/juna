"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";

interface IProps {
  children: ReactNode;
}

function MainLayout({ children }: IProps) {

  return (
    <>
      <Navbar />
      <Flex minHeight={600}>{children}</Flex>
      <Footer />
    </>
  );
}

export default MainLayout;
