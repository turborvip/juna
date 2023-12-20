"use client";
import DrawerCus from "@/app/src/components/DrawerCus";
import { products } from "@/app/src/constants";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

function Detail({ params }: { params: { slug: string } }) {
  const product = products.find((item: any) => item.code == params.slug);
  const { isOpen, onOpen:onOpenDrawer, onClose:onCloseDrawer } = useDisclosure()
  const { isOpen:isOpenModal, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [quantity, setQuantity] = useState<any>(1)

  const handleAddToCard = () =>{
    let cart = window?.localStorage.getItem("cart") ? JSON.parse(window?.localStorage.getItem('cart')||'[]') : [];
    let itemOld = cart.find((record:any)=>record.code == product?.code);
    let itemOldIndex;
    if(itemOld){
        itemOldIndex = cart.findIndex((record:any)=> record.code == product?.code)
        cart[itemOldIndex].quantity = parseInt(cart[itemOldIndex].quantity) + parseInt(quantity);
    }else{
        let item = {...product, quantity:1};
        cart.push(item);
    }
    window?.localStorage.setItem("cart",JSON.stringify(cart))
    onOpenDrawer();
  }
  return (
    <>
    <Container maxW={"7xl"} position={"relative"} mt={50} mb={50}>
      <Breadcrumb fontWeight="medium" fontSize="md">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Product</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Detail</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{params.slug}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        my={10}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%" }}
          alt="Caffe Latte"
          src={product?.thumbnail}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{product?.name.toUpperCase()}</Heading>
            <Text py="2">{product?.description}</Text>

            <Box mt={30}>
              <Text fontSize={"3xl"}>
                {product?.cost.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
              <NumberInput size="md" maxW={20} defaultValue={1} min={1} my={3} mt={50} onChange={(value)=>setQuantity(value)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>  

            <Flex mt={100} alignItems='center' gap='2'>
              <Button colorScheme="teal" variant="solid" ml={2} onClick={onOpen}>
                Mua hàng
              </Button>
              <Button colorScheme="teal" variant="outline" color={"teal"} border={"1px solid teal"} onClick={handleAddToCard}>
                Thêm vào giỏ hàng <FaCartPlus />
              </Button>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
    </Container>
    <DrawerCus isOpen={isOpen} onOpenDrawer={onOpenDrawer} onCloseDrawer={onCloseDrawer} btnRef={btnRef}/>
    <Modal isOpen={isOpenModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mua ngay</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Liên hệ với chúng tôi để có thể mua hàng sớm nhất!!!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Đóng
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Detail;
