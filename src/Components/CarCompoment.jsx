import React, { useEffect, useState } from 'react'
import XeLexus from '../Components/image/Lexus-white.jpg'
import XeMayBach from '../Components/image/Maybach-black.jpg'
import XeLandRover from '../Components/image/Land Rover.png'
import { SearchIcon } from '@chakra-ui/icons'
import CartComponent from './CartComponent'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormHelperText,
    useToast,
    Box, Button, Text, ButtonGroup, Card, CardBody, CardFooter, Center, Divider, Heading, Input, InputGroup, InputRightElement, Stack, CardHeader, Flex, useDisclosure, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react'
import CarCardComponent from './CarCardComponent'

const CarCompoment = () => {
    const toast = useToast()
    const showToast = (title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputAddCar, setInputAddCar] = useState({
        inputCarName: '',
        inputCarInfo: '',
        inputCarPrice: '',
        inputCarImage: ''
    })

    const handleInputChange = (inputName, e) => {
        setInputAddCar((prevValues) => ({
            ...prevValues,
            [inputName]: e.target.value,
        }));
    };

    const resetInputValues = () => {
        setInputAddCar({
            inputCarName: '',
            inputCarInfo: '',
            inputCarPrice: '',
            inputCarImage: ''
        });
    };

    const handleCloseModal = () => {
        onClose();
        resetInputValues();
    };

    const [carListDefault, setCarListDefault] = useState([{
        id: 1,
        carName: 'Xe Lexus',
        carImage: XeLexus,
        carPrice: 250000,
        carInfor: 'Xe của bọn Nhật',
        isLike: false,
        isCart: false,
        amount: 0
    },
    {
        id: 2,
        carName: 'Xe Maybach',
        carImage: XeMayBach,
        carPrice: 350000,
        carInfor: 'Xe của bọn Đức',
        isLike: false,
        isCart: false,
        amount: 0

    }, {
        id: 3,
        carName: 'Xe Land Rover',
        carImage: XeLandRover,
        carPrice: 450000,
        carInfor: 'Xe của bọn mỹ',
        isLike: true,
        isCart: false,
        amount: 0

    }])
    const [carList, setCarList] = useState(carListDefault)
    const [searchInput, setSearchInput] = useState('')
    const [cartList, setCartList] = useState([])

    const handleInputSearch = (value) => {
        const newValueInput = value.toLowerCase().replace(/\s/g, '')
        setSearchInput(newValueInput)
    }

    const handleSearchCar = (carList, inputValue) => {
        const newCarList = carList.filter(item => {
            const lowerCaseCarName = item.carName.toLowerCase().replace(/\s/g, '')
            const result = lowerCaseCarName.includes(inputValue)
            return result
        })

        if (newCarList.length > 0) {
            setCarList(newCarList)
        } else {
            setCarList(carListDefault)
        }

    }

    const handleAddCar = () => {
        const isDuplicated = carListDefault.find(car => car.carName === inputAddCar.inputCarName);

        if (isDuplicated) {
            showToast('Cảnh báo!', 'Xe này đã có trong danh sách', 'error');
            return;
        }

        const newCar = {
            id: carListDefault.length + 1,
            carName: inputAddCar.inputCarName,
            carInfor: inputAddCar.inputCarInfo,
            carPrice: parseFloat(inputAddCar.inputCarPrice),
            carImage: inputAddCar.inputCarImage,
            isLike: false,
            isCart: false,
            amount: 0,
        };

        const updatedCarListDefault = [...carListDefault, newCar];

        setCarList(updatedCarListDefault);
        setCarListDefault(updatedCarListDefault);

        handleCloseModal();
        showToast('Thành công!', `${newCar.carName} đã được thêm mới`, 'success');
    };

    const handleDeleteCar = (carID) => {
        console.log('check cái xe carID : ', carID)

        const updatedCarListDefault = carListDefault.filter(car => car.id !== carID)
        const carRemoved = carListDefault.find(car => car.id === carID)
        setCarList(updatedCarListDefault);
        setCarListDefault(updatedCarListDefault);
        showToast(`Thông báo!`, `${carRemoved.carName} đã bị xóa ra khỏi danh sách`, 'success')
    }

    useEffect(() => {
        const cartListUpdated = carListDefault.filter(car => car.isCart === true)
        setCartList(cartListUpdated)
    }, [carListDefault])

    console.log('check cartList :', cartList)

    return (
        <Box pos={'relative'} background={'#ccc'} paddingBottom={'50px'}>
            <Center>
                <Box width={'57%'} padding={'50px 0px'} display={'flex'} justifyContent={'space-between'}>
                    <InputGroup width={'80%'}>
                        <Input onKeyUp={() => {
                            searchInput ? handleSearchCar(carList, searchInput) : setCarList(carListDefault)
                        }} onChange={(e) => handleInputSearch(e.target.value)} background={'white'} placeholder='Nhập tên xe...' width={'100%'} />
                        <InputRightElement>
                            <Button onClick={() => handleSearchCar(carList, searchInput)} background={'#b0edee'} _hover={{ background: '#00ffef' }} marginRight={3} size={'sm'}><SearchIcon /></Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button onClick={onOpen} width={'18%'} background={'#66d393'}>
                        <Text>Thêm Xe Mới</Text>
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />

                        <ModalContent>
                            <ModalHeader>Add a new Car</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody>
                                <FormControl mb={5}>
                                    <Input
                                        placeholder='Car Name'
                                        value={inputAddCar.inputCarName}
                                        onChange={(e) => handleInputChange('inputCarName', e)}
                                    />
                                    <FormHelperText>Tên xe không được trùng</FormHelperText>
                                </FormControl>

                                <FormControl mb={5}>
                                    <Input
                                        placeholder='Car Infor'
                                        value={inputAddCar.inputCarInfo}
                                        onChange={(e) => handleInputChange('inputCarInfo', e)}
                                    />
                                    <FormHelperText>Nói gì đó về chiếc xe này</FormHelperText>
                                </FormControl>

                                <FormControl mb={5}>
                                    <NumberInput>
                                        <NumberInputField
                                            placeholder='Car Price'
                                            value={inputAddCar.inputCarPrice}
                                            onChange={(e) => handleInputChange('inputCarPrice', e)}
                                        />
                                    </NumberInput>
                                    <FormHelperText>Vui lòng chỉ nhập số</FormHelperText>
                                </FormControl>

                                <FormControl mb={5}>
                                    <Input
                                        placeholder='Car Image'
                                        value={inputAddCar.inputCarImage}
                                        onChange={(e) => handleInputChange('inputCarImage', e)}
                                    />
                                    <FormHelperText>Link hình ảnh của xe</FormHelperText>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => {
                                    onClose()
                                    handleCloseModal()
                                }}>
                                    Close
                                </Button>
                                <Button onClick={handleAddCar} variant='ghost'>
                                    Add this Car
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Center>

            <Center>
                {carList.map((item) => {
                    return (
                        <Flex>
                            <CarCardComponent
                                key={item.id}
                                carInfo={item}
                                carListDefault={carListDefault}
                                setCarListDefault={setCarListDefault}
                                setCarList={setCarList}
                                showToast={showToast}
                                onDelete={handleDeleteCar}
                            />
                        </Flex>
                    )
                })}
            </Center>

            <Box border={'1px solid white'} p={2} rounded={5} pos={'absolute'} top={'6.8%'} right={'15%'}>
                <CartComponent
                    carListDefault={carListDefault}
                    cartList={cartList}
                    setCartList={setCartList}
                    showToast={showToast}
                />
            </Box>
        </Box>
    )
}

export default CarCompoment