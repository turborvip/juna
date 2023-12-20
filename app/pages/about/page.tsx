import { Box, Container, Image } from '@chakra-ui/react'
import React from 'react'

function Contact() {
  return (
    <Container maxW={"7xl"} position={"relative"} mt={50} mb={50}>
        <Box mb={20}>
            <Image src={'/avatar.png'}  w={"100%"}/>
        </Box>
        <Box mb={20}>
            <Image src={'/Brochure2/1.png'} />
        </Box>
        <Box mb={20}>
            <Image src={'/Brochure2/2.png'} />
        </Box>
    </Container>
  )
}

export default Contact