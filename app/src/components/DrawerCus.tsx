import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function DrawerCus({ isOpen, onOpenDrawer, onCloseDrawer, btnRef }: any) {
  const [dataCard, setDataCard] = useState<any>();
  const [amount, setAmount] = useState<any>(0);

  let cart = [];
  if (typeof window !== "undefined") {
    cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
  }
  useEffect(() => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];
    }
    setDataCard(cart);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[0].quantity * cart[0].cost;
    }
    setAmount(total);
  }, [cart]);

  const handleRemoveItem = (code: any) => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];
    }
    cart = cart.filter((item: any) => item.code != code);
    localStorage.setItem("cart", JSON.stringify(cart));
    setDataCard(cart);
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onCloseDrawer}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={onCloseDrawer} />
        <DrawerHeader>Giỏ hàng</DrawerHeader>

        <DrawerBody position={"relative"}>
          {dataCard?.map((item: any, index: string) => (
            <Card
              w={"100%"}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              position={"relative"}
              key={index}
              mb={2}
            >
              <Image
                objectFit="cover"
                w={"40%"}
                h={"100%"}
                alt="Caffe Latte"
                src={item.thumbnail}
                margin={"auto"}
              />

              <Stack>
                <CardBody>
                  <Heading size="xs">{item.name}</Heading>
                  <Text fontSize={"sm"} py={2}>
                    x{item.quantity} ={" "}
                    {(item.quantity * item.cost).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </CardBody>
              </Stack>
              <Text
                color={"red"}
                position={"absolute"}
                right={1}
                cursor={"pointer"}
                onClick={() => {
                  handleRemoveItem(item.code);
                }}
              >
                X
              </Text>
            </Card>
          ))}
        </DrawerBody>

        <DrawerFooter>
          <Text m={2}>
            {amount.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
          <Link href={"../pages/payment"}>
            <Button colorScheme="blue">Thanh Toán</Button>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerCus;
