import { Image } from 'react-native';
import logo from '@/assets/images/main-logo.png'

function CustomHeader(){
  return(
    <Image 
      source={logo} 
      className="max-h-[40px]"
      resizeMode="contain" 
    />
  )
}

export default CustomHeader