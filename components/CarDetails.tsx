import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { CarProps } from '@/types';

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({isOpen, closeModal, car}:CarDetailsProps)=>{
  return (
    <div>CarDetails</div>
  )
}

export default CarDetails