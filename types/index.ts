import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?:string;
    rightIcon?:string;
    isDisabled?:boolean;
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer:string) => void;
}

export interface CarProps {
    city_mpg?:number; // 23 "this field is for premium subscribers only"; ( bcs of that I used const as example )
    class:string;
    combination_mpg?:number;// 24 "this field is for premium subscribers only"; ( bcs of that I used const as example )
    cylinders:number;
    displacement:number;
    drive:string;
    fuel_type:string;
    highway_mpg?:number; // 26 "this field is for premium subscribers only"; ( bcs of that I used const as example )
    make:string;
    model:string;
    transmission:string;
    year:number;
}