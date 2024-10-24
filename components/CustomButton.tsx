import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}

const CustomButton = ({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`rounded-xl min-h-[62px] justify-center items-center outline-2  ${containerStyles} `}
            onPress={onPress}
        >
            <Text
                className={`font-semibold text-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;