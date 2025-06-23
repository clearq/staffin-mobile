import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from '@rneui/themed'

// import { Button as ButtonBase } from "@rneui/themed";
import { theme } from "@/constants/Theme";
import pageStyle from "@/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { size } from "lodash";

interface Props {
  title: string;
  onPress?: () => void;
  titleColor: any;
  iconLeft?: keyof typeof MaterialCommunityIcons.glyphMap
  iconRight?: keyof typeof MaterialCommunityIcons.glyphMap
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  type?: "default" | "outline";
  loading?: boolean;
  disabled?: boolean;
  hasIconRight?: boolean
  hasIconLeft?: boolean
}

export const Button: React.FC<Props> = (Props) => {
  const { theme } = useTheme()

  // button size
  const height =
    Props.size === 'sm' ? 24 :
    Props.size === 'md' ? 32 :
    Props.size === 'lg' ? 40 :
    24; //

  const bgColor =
    Props.disabled ? theme.colors.disabled :
    Props.color === 'primary' ? theme.colors.primary :
    Props.color === 'secondary' ? theme.colors.secondary :
    Props.color === 'success' ? theme.colors.success :
    Props.color === 'warning' ? theme.colors.warning :
    Props.color === 'error' ? theme.colors.error :
    theme.colors.primary;
      
  
  return(
    <TouchableOpacity
      onPress={Props.onPress}
      style={{
        ...styles.btn,
        height,
        backgroundColor : Props.type === 'outline' ? 'transparent' : bgColor,
        borderColor: bgColor
      }}
      disabled={Props.disabled}
    >

      {Props.loading && 
        <ActivityIndicator  size={'small'} color={Props.titleColor} />
      }

      {!Props.loading &&
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.xl,
          }}
        >
          {Props.hasIconLeft && 
            <View
              style={{alignSelf: 'flex-start'}}
            >
              <MaterialCommunityIcons 
                name={Props.iconLeft} 
                size={20} 
                color={Props.titleColor} 
              />
            </View>  
          }

          <View
            style={{alignSelf: 'center'}}
          >
            <Text
              style={{
                ...pageStyle.button16,
                color: Props.titleColor,
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              {Props.title}
            </Text>
          </View>

          {Props.hasIconRight && 
            <View
              style={{alignSelf: 'flex-end'}}
            >
              <MaterialCommunityIcons 
                name={Props.iconRight} 
                size={20} 
                color={Props.titleColor}
              />
            </View>
          }
        </View>
      }
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: theme.spacing?.sm,
    alignItems: 'center',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  }

});


// interface PropsButton {
//   title: string;
//   onPress?: () => void;
//   titleStyle?: any;
//   buttonStyle?: any;
//   containerStyle?: any;
//   disabled?: boolean;
//   loading?: boolean;
//   icon?: any;
//   iconPosition?: "left" | "right";
//   linearGradientProps?: any;
//   size?: "sm" | "md" | "lg";
//   radius?: number | "sm" | "md" | "lg";
//   color?: "primary" | "secondary" | "success" | "warning" | "error";
//   type?: "solid" | "outline" | "clear";
// }

// export default function Button({ title, onPress, titleStyle, buttonStyle, containerStyle, disabled, loading, icon, iconPosition, size, color, radius, type }: PropsButton) {
//   // Custom loading icon as an ActivityIndicator
//   const renderLoadingIcon = () => (
//     <ActivityIndicator size="small" color="#FFF" /> // Customize color and size as needed
//   );

//   return (
//     <ButtonBase
//       title={loading ? "" : title} // Hide title when loading
//       onPress={onPress}
//       color={color}
//       radius={radius}
//       type={type}
//       titleStyle={{...titleStyle, ...pageStyle.button16}}
//       buttonStyle={{...buttonStyle, borderRadius: theme.spacing?.xs}}
//       containerStyle={{...containerStyle}}
//       disabled={disabled}
//       loading={loading}
//       // Replace the icon with a spinner if loading, otherwise show the provided icon
//       icon={loading ? renderLoadingIcon() : icon}
//       iconPosition={iconPosition}
//       size={size}
//     />
//   );
// }
