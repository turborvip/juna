"use client";
import DrawerCus from "@/app/src/components/DrawerCus";
import ProductItem from "@/app/src/components/ProductItem";
import { products } from "@/app/src/constants";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Product() {
  const [sliderValue, setSliderValue] = React.useState(500000);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [filter, setFilter] = useState<any>('small');
  const btnRef = React.useRef();

  const {
    isOpen,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  return (
    <Container maxW={"8xl"}>
      <Breadcrumb fontSize={"2xl"} fontWeight={"bold"} mt={40}>
        <BreadcrumbItem>
          <BreadcrumbLink href="../">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Tất cả sản phẩm</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Grid w={"100%"} templateColumns="repeat(12, 1fr)" gap={8} marginY={100}>
        <GridItem colSpan={3}>
          <Text fontSize={"larger"} fontWeight={"bold"}>
            Duyệt theo
          </Text>
          <Divider my={8} />
          <Text fontSize={"medium"} fontWeight={"bold"} as="u" mb={5}>
            Tất cả sản phẩm
          </Text>
          <Text fontSize={"larger"} fontWeight={"bold"} my={10}>
            Lọc theo
          </Text>
          <Text fontSize={"large"} fontWeight={"bold"}>
            Giá
          </Text>
          <Divider my={5} />
          <Slider
            id="slider"
            defaultValue={500000}
            min={0}
            max={1000000}
            colorScheme="teal"
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </GridItem>
        <GridItem colSpan={9} rowSpan={1}>
          <Image
            src={"/Catalogue/6.png"}
            w={"100%"}
            h={"160px"}
            objectFit="cover"
            mb={10}
          />
          <Center mb={10}>
            <Text fontSize={"2xl"} fontWeight={"bolder"}>
              Tất cả sản phẩm
            </Text>
          </Center>
          <Flex>
            <Box p="4">Tất cả : {products.filter((item:any)=>item.cost < sliderValue).length} sản phẩm</Box>
            <Spacer />
            <Box p="4">
              <Flex>
                <Text w={'150px'}>Sắp xếp theo:</Text>
                <Select size="sm" onChange={(e)=>setFilter(e.target.value)}>
                  <option value="small">Giá thấp đến cao</option>
                  <option value="big">Giá cao đến thấp</option>
                  <option value="AZ">Tên A - Z</option>
                  <option value="ZA">Tên Z - A</option>
                </Select>
              </Flex>
            </Box>
          </Flex>
          <SimpleGrid columns={[2, null, 3]} spacing="40px">
            {products.filter((item:any)=>item.cost < sliderValue).sort(sortType[filter])?.map((item, index) => (
              <ProductItem
                key={index}
                item={item}
                ref={btnRef}
                addToCard={onOpenDrawer}
              />
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
      <DrawerCus
        isOpen={isOpen}
        onOpenDrawer={onOpenDrawer}
        onCloseDrawer={onCloseDrawer}
        btnRef={btnRef}
      />
    </Container>
  );
}

export default Product;

const sortType:any = {
  small:(a:any, b:any) => a.cost - b.cost,
  big:(a:any, b:any) => b.cost - a.cost,
  AZ:(a:any, b:any) => a.name.localeCompare(b.name),
  ZA:(a:any, b:any) => b.name.localeCompare(a.name),
}

