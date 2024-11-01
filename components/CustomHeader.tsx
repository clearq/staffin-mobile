import { Image, View } from 'react-native';
import logo from '@/assets/images/staffin-circle.svg'

function CustomHeader(){
  return(
      <Image 
        source={logo} 
        className="object-cover h-[40px] w-[40px]"
      />
  )
}

export default CustomHeader