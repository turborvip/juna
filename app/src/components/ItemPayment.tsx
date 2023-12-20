import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

function ItemPayment({
  index,
  item,
  handleRemoveItem,
  handleChangeQuantity,
}: any) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: item.quantity,
      min: 1,
      max: 10,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
  }, [localStorage.getItem("cart")]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      key={index}
      mb={3}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "150px" }}
        src={item?.thumbnail}
      />

      <Stack>
        <CardBody>
          <Heading size="xs">{item.name}</Heading>
          <HStack maxW="320px" my={5}>
            <Button
              {...inc}
              onClick={() => handleChangeQuantity(item.code, input.value)}
            >
              +
            </Button>
            <Input {...input} />
            <Button
              {...dec}
              onClick={() => handleChangeQuantity(item.code, input.value)}
            >
              -
            </Button>
          </HStack>
          <Text fontSize={"md"} py={2}>
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

        x
      </Text>
    </Card>
  );
}

export default ItemPayment;
