import { Box, Button, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import { BsBicycle, BsCart, BsDash, BsDashLg, BsFillCartFill, BsFillTrash3Fill, BsPlus, BsPlusLg, BsRecycle, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const CartComponent = ({ carListDefault, cartList, setCartList, showToast }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sumTotalLike = carListDefault.reduce((total, car) => total + (car.isLike ? 1 : 0), 0);
    const sumTotalCart = carListDefault.reduce((total, car) => total + (car.isCart ? 1 : 0), 0);
    const [sumTotalAmount, setSumTotalAmount] = useState(0);

    useEffect(() => {
        const totalAmount = cartList.reduce((total, car) => total + (car.amount * car.carPrice), 0);
        setSumTotalAmount(totalAmount);
    }, [cartList]);
    const checkCartToOpenModal = () => {
        const cartListCheck = cartList.find(car => car.isCart)

        if (cartListCheck) {
            onOpen()
        } else {
            showToast('Thông báo!', 'Giỏ hàng của bạn hiện đang trống, hãy thêm sản phẩm vào và thử lại sau', 'warning')
        }
    }

    const handleCountAmount = (isTrue, carItem) => {
        const updatedCartList = cartList.map(car => {
            if (car.id === carItem.id) {
                const updatedAmount = isTrue ? car.amount + 1 : Math.max(1, car.amount - 1);
                const updatedCar = { ...car, amount: updatedAmount };
                return updatedCar;
            }
            return car;
        });

        setCartList(updatedCartList);
    };

    return (
        <>
            <Flex alignItems={'center'} gap={5}>
                <Flex onClick={() => checkCartToOpenModal()} cursor={'pointer'} alignItems={'center'} gap={1}>
                    <Box>
                        {sumTotalCart === 0 ? <BsCart size={20} /> : <BsFillCartFill color='green' size={20} />}
                    </Box>
                    <Text visibility={sumTotalCart === 0 ? 'hidden' : 'visible'} fontSize={20}>{sumTotalCart}</Text>
                </Flex>

                <Flex cursor={'pointer'} alignItems={'center'} gap={1}>
                    <Box>
                        {sumTotalLike === 0 ? <BsSuitHeart size={20} /> : <BsSuitHeartFill color='red' size={20} />}
                    </Box>
                    <Text visibility={sumTotalLike === 0 ? 'hidden' : 'visible'} fontSize={20}>{sumTotalLike}</Text>
                </Flex>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {cartList.map(car => {
                            return (
                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                    <Flex width={'40%'} gap={2}>
                                        <Image width={35} src={car.carImage} />
                                        <Text fontWeight={'semibold'}>{car.carName}</Text>
                                    </Flex>

                                    <Flex width={'50%'} color={'black'} alignItems={'center'}>
                                        <Text minWidth={'30%'} marginRight={5}>${car.carPrice * car.amount}</Text>
                                        <Box onClick={() => handleCountAmount(false, car)} border={'1px solid gray'}><BsDashLg /></Box>
                                        <Text textAlign={'center'} minW={'10%'} padding={'0px 3px'} display={'block'} lineHeight={'100%'} borderTop={'1px solid gray'} borderBottom={'1px solid gray'}>{car.amount}</Text>
                                        <Box onClick={() => handleCountAmount(true, car)} border={'1px solid gray'}><BsPlusLg /></Box>
                                    </Flex>

                                    <Box cursor={'pointer'} _hover={{ color: 'orange' }}>
                                        <BsFillTrash3Fill />
                                    </Box>
                                </Flex>
                            )
                        })}

                        <Box marginTop={5} textAlign={'right'}>Tổng tiền : <Text display={'inline-block'} fontWeight={'bold'}>${sumTotalAmount}</Text> </Box>
                    </ModalBody>

                    <ModalFooter display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text alignContent={'left'}>Bạn có {cartList.length} sản phẩm trong giỏ hàng</Text>
                        <Box>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='whatsapp'>Thanh toán</Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CartComponent