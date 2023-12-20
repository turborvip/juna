"use client";
import ItemPayment from "@/app/src/components/ItemPayment";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

function Payment() {
  const [dataCard, setDataCard] = useState<any>();
  const [amount, setAmount] = useState<any>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  let cart 
  if (typeof window !== "undefined") {
  let cart = localStorage.getItem("cart")
  }

  const handleRemoveItem = (code: any) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart = cart.filter((item: any) => item.code != code);
      localStorage.setItem("cart", JSON.stringify(cart));
      setDataCard(cart);
    }
  };

  const handleChangeQuantity = (code: any, quantity: any) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      let itemIndex = cart.findIndex((item: any) => item.code == code);
      cart[itemIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      setDataCard(cart);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setDataCard(cart);
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].quantity * cart[i].cost;
      }
      setAmount(total);
    }
  }, [cart]);
  return (
    <>
      <Container maxW={"7xl"} my={35} py={20}>
        <Grid templateColumns="repeat(12, 1fr)" gap={10}>
          <GridItem colSpan={8}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Giỏ hàng của tôi
            </Text>
            <Divider my={10}></Divider>
            {dataCard?.map((item: any, index: any) => (
              <ItemPayment
                item={item}
                key={index}
                handleRemoveItem={handleRemoveItem}
                handleChangeQuantity={handleChangeQuantity}
              />
            ))}
            <Divider my={10}></Divider>
            <Box></Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Tóm tắt đơn hàng
            </Text>
            <Divider my={10}></Divider>
            <Flex mb={7}>
              <Box>Tổng từng phần</Box>
              <Spacer />
              <Box>
                {amount.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Box>
            </Flex>
            <Flex>
              <Box>Giao hàng</Box>
              <Spacer />
              <Box>
                <Text as={"u"}>Miễn phí</Text>
              </Box>
            </Flex>
            <Divider my={10}></Divider>
            <Flex mb={7}>
              <Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Tổng
                </Text>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize={"xl"} fontWeight={"bold"}>
                  {amount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </Box>
            </Flex>
            <Flex mb={5} cursor={"pointer"} onClick={onOpen}>
              <Center
                width={"100%"}
                h={50}
                bg={useColorModeValue("teal.900", "teal.200")}
                color={useColorModeValue("gray.100", "gray.900")}
              >
                Thanh Toán
              </Center>
            </Flex>
            <Center>
              <Icon as={FaLock} mx={2} />
              Thanh toán bảo mật
            </Center>
          </GridItem>
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Hiện chúng tôi không thể chấp nhận đơn hàng trực tuyến
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Vui lòng liên hệ với chúng tôi để hoàn tất giao dịch mua của bạn.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Đã hiểu
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}

export default Payment;
