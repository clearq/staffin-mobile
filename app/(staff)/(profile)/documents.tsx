import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// UI
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/globalStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ButtonMd } from '@/components/UI/CustomButton';
import { Checkbox } from 'react-native-paper';

type prop = {
  name: string | null;
  url: string | null;
  loading: boolean;
  error: string | null;
  onDownload: () => void;
}

const StaffDocuments = ({name, url, loading, error, onDownload}:prop) => {
  const [sortStyle, setSortStyle] = useState<'symbol'|'list'>('symbol')

  return (
    <View style={[globalStyles.container, globalStyles.paddingX, {gap:8}]}>

      {/* Menu */}
      <View style={[styles.btnGroup]}>

        <TouchableOpacity 
          style={sortStyle === 'symbol' 
            ? globalStyles.iconButtonBlack
            : globalStyles.iconButtonOutlineBlack
          }
          onPress={() => setSortStyle('symbol')}
        >
          <MaterialCommunityIcons 
            name='border-all' 
            size={16} 
            color={sortStyle === 'symbol' 
              ? colors.white
              : colors.black
            } 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={sortStyle === 'list' 
            ? globalStyles.iconButtonBlack
            : globalStyles.iconButtonOutlineBlack
          }
          onPress={() => setSortStyle('list')}
        >
          <MaterialCommunityIcons   
            name='format-list-bulleted-square' 
            size={16} 
            color={sortStyle === 'list' 
              ? colors.white
              : colors.black
            } 
          />
        </TouchableOpacity>

        <ButtonMd 
          title='Download File'
          handlePress={onDownload}
          containerStyles={globalStyles.btnOrange}
          textColor={colors.white}
          isLoading={loading}
        />

      </View>

      {name && sortStyle === 'symbol' &&
          <View style={[styles.symbolContainer]}>
            <View style={[styles.symbolCard]}>
              <Image source={require('@/assets/Images/pdf-icon.png')} style={{width:24, height:24}} />
            </View>
            <Text>{name}</Text>
          </View>       
      }

      {name && sortStyle === 'list' &&
          <View style={[styles.listContainer]}>
            <View style={[styles.listIcon]}>
              <Image source={require('@/assets/Images/pdf-icon.png')} style={{width:24, height:24}} />
            </View>
            <Text>{name}</Text>
          </View>       
      }
    </View>
  )
}

export default StaffDocuments

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  btnGroup: {
    flexDirection:'row', 
    gap:8, 
    justifyContent:'flex-end'
  },
  symbolContainer: {
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    gap:8,
  },
  listContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    gap:8,
  },
  symbolCard: {
    width:80, 
    height:80, 
    backgroundColor:colors.tintColor, justifyContent:'center', 
    alignItems:'center',
  },
  listIcon:{
    width:24, 
    height:24, 
    justifyContent:'center', 
    alignItems:'center',
  },
})