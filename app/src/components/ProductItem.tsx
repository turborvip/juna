import {
  Box,
  Center,
  Divider,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaCartPlus, FaPaperPlane } from "react-icons/fa";

function ProductItem({ index, item, addToCard }: any) {
  const handleAddToCard = (addToCard: any) => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];
    }
    let itemOld = cart.find((record: any) => record.code == item.code);
    let itemOldIndex;
    if (itemOld) {
      itemOldIndex = cart.findIndex((record: any) => record.code == item.code);
      cart[itemOldIndex].quantity++;
    } else {
      item.quantity = 1;
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    addToCard();
  };
  return (
    <Box position={"relative"} className="product_item">
      <Box
        height="460px"
        border={"1px solid #6A4C3C"}
        padding={10}
        color={"#18473C"}
      >
        <div>
          <Image
            src={item.thumbnail}
            height={"260px"}
            objectFit={"cover"}
            width={"100%"}
          />
          <Text marginTop={3} fontSize={"larger"} fontWeight={"bold"}>
            {item.name}
          </Text>
          <Text fontWeight={"light"}>Mã SP: {item.code}</Text>
          <Divider
            color={"#6A4C3C"}
            height={1}
            bgColor={"#6A4C3C"}
            marginY={5}
          />
          <Text as={"i"}>Giá: {item.price}</Text>
        </div>
      </Box>
      <Box
        bg={useColorModeValue("gray.800", "gray.300")}
        height={"75px"}
        position={"absolute"}
        width={"100%"}
        bottom={"0px"}
        className="product_item_btns"
      >
        <SimpleGrid columns={2} spacing={2}>
          <Link href={`../pages/detail/${item.code}`}>
            <Center
              h={"75px"}
              bg={useColorModeValue("gray.600", "gray.200")}
              className="btn_buy"
            >
              <Icon
                as={FaPaperPlane}
                fontSize={"2xl"}
                color={useColorModeValue("gray.200", "gray.800")}
              />
            </Center>
          </Link>
          <Center
            h={"75px"}
            bg={useColorModeValue("gray.600", "gray.200")}
            className="add_to_cart"
            onClick={() => handleAddToCard(addToCard)}
          >
            <Icon
              as={FaCartPlus}
              fontSize={"2xl"}
              color={useColorModeValue("gray.200", "gray.800")}
            />
          </Center>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default ProductItem;
