import React from 'react'
import { Box, Button, Image, Text, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Input, InputGroup, InputRightElement, Stack, CardHeader, CheckboxIcon, Flex } from '@chakra-ui/react'
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'

const CarCardComponent = ({ carInfo, setCarList, carListDefault, setCarListDefault, showToast, onDelete }) => {
    const handleChangeLike = (carListDefault, carItem) => {
        const updateCarList = carListDefault.map(car => {
            if (car.id === carItem.id) {
                return { ...car, isLike: !car.isLike }
            }
            return car
        })
        setCarListDefault(updateCarList)
        setCarList(updateCarList)
    }

    const deleteCar = () => {
        onDelete(carInfo.id)
    }

    const handleAddToCart = (carList, carItem) => {
        const updatedListCar = carList.map(car => {
            if (car.id === carItem.id && !carItem.isCart) {
                const carUpdated = { ...car, isCart: true, amount: carItem.amount + 1 }
                showToast('Thông báo!',
                    `Bạn đã thêm ${carItem.carName} vào giỏ hàng`,
                    `success`
                )
                return carUpdated
            } else if (car.id === carItem.id && carItem.isCart) {
                showToast('Thông báo!',
                    `${carItem.carName} đã có trong giỏ hàng rồi`,
                    `warning`
                )
            }
            return car
        })
        setCarListDefault(updatedListCar)
        setCarList(updatedListCar)
    }

    return (
        <>
            <Card key={carInfo.id} width={'350px'} margin={'0px 10px'}>
                <CardHeader position={'relative'} >
                    <Box onClick={deleteCar} cursor={'pointer'} _hover={{ backgroundColor: 'gray', transition: 'all 0.2s linear' }} backgroundColor={'#ccc'} position={'absolute'} padding={2} rounded={5}>
                        <Flex>
                            <DeleteIcon />
                        </Flex>
                    </Box>
                    <Image
                        src={carInfo.carImage}
                        alt={``}
                        width={'100%'}
                        height={'200px'}
                        borderRadius='lg'
                    />
                    <Box mt='6' spacing='3'>
                        <Heading textAlign={'center'} size='md'>{carInfo.carName}</Heading>
                        <Text textAlign={'center'}>
                            {carInfo.carInfor}
                        </Text>
                        <Text textAlign={'center'} color='blue.600' fontSize='2xl'>
                            {`${carInfo.carPrice}$`}
                        </Text>
                    </Box>
                </CardHeader>

                <CardFooter>
                    <ButtonGroup spacing='8'>
                        <Button colorScheme='blue'>
                            Buy now
                        </Button>
                        <Button onClick={() => {
                            handleChangeLike(carListDefault, carInfo);
                            showToast('Thông báo!',
                                carInfo.isLike ? `Bạn đã unLike ${carInfo.carName}` : `Bạn đã Like ${carInfo.carName}`,
                                carInfo.isLike ? `error` : `success`
                            )
                        }
                        } backgroundColor={'#e2e8f0'}>
                            {carInfo.isLike ? <CheckCircleIcon color={'green'} /> : <CheckCircleIcon color={'gray'} />}
                        </Button>
                        <Button
                            onClick={() => handleAddToCart(carListDefault, carInfo)}
                            colorScheme='whatsapp'>
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
}

export default CarCardComponent