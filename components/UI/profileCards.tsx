import Colors from '@/constants/Colors'
import { globalStyles } from '@/constants/GlobalStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    columnGap:8,
    backgroundColor: `${Colors.white70}`,
    padding:16,
    marginTop:16,
  },
  cardHeader:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  cardBody:{
    marginTop:16,
    flexDirection: 'column',
  },
  buttonGroup:{
    flexDirection: 'row',
    gap:16,
  },
  cardFooter:{
    flex:1,
    alignItems:'center',
    position:'relative',
  },
})

// Card: Default
interface Defaultprops {
  cardBody:  React.ReactNode
  title: string
  handleEdit: ()=> void
}

const ProfileCard = ({ cardBody, title, handleEdit }: Defaultprops) => {

  return (
    <View style={styles.container}>

      {/* Card header */}
      <View style={[styles.cardHeader]}>
        <Text style={[globalStyles.titleText]}>{title}</Text>

        <TouchableOpacity
          onPress={handleEdit}
        >       
          <MaterialCommunityIcons name='pencil-outline' size={24} color={Colors.textGray} />
        </TouchableOpacity>
      </View>

        {/* Card body */}
      <View style={[styles.cardBody]}>
        {cardBody}
      </View>

    </View>
  )
}


// Card: Add + Edit
interface Addprops {
  cardBody:  React.ReactNode
  title: string
  handleEdit: ()=> void
  handleAdd: () => void
}

const ProfileCardAdd = ({ cardBody, title, handleEdit, handleAdd }: Addprops) => {

  return (
    <View style={styles.container}>

      {/* Card header */}
      <View style={[styles.cardHeader]}>
        <Text style={[globalStyles.titleText]}>{title}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={handleAdd}
          >       
            <MaterialCommunityIcons name='plus' size={24} color={Colors.textGray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleEdit}
          >       
            <MaterialCommunityIcons name='pencil-outline' size={24} color={Colors.textGray} />
          </TouchableOpacity>
        </View>
      </View>

        {/* Card body */}
      <View style={[styles.cardBody]}>
        {cardBody}
      </View>

    </View>
)}


// Card: With Footer
interface props {
  cardBody:  React.ReactNode
  title: string
  footerText: string
}

const ProfileCardFotter = ({ cardBody, title, footerText }: props) => {

  return (
    <View style={styles.container}>

      {/* Card header */}
      <View style={[styles.cardHeader]}>
        <Text style={[globalStyles.titleText]}>{title}</Text>
      </View>

        {/* Card body */}
      <View style={[styles.cardBody]}>
        {cardBody}
      </View>

      {/* Card Footer */}
      <View style={styles.cardFooter}>
        <View style={[globalStyles.divider]}/>

        <View style={{ width:'100%', flexDirection:'row', justifyContent:'center', }}>
          <Text style={[globalStyles.fontSemibold, {color:`${Colors.textGray}`, fontSize:16,}]}>{footerText}</Text>
          <MaterialCommunityIcons name='arrow-right-circle-outline' size={24} style={{position:'absolute', right: 0, color:`${Colors.textGray}`}} />
        </View>

      </View>

    </View>
)}



export  {ProfileCard, ProfileCardAdd, ProfileCardFotter}