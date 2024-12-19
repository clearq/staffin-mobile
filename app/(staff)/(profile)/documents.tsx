import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// API
import { downloadCV, getCV } from '@/api/staff';
// UI
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/globalStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ButtonMd } from '@/components/UI/CustomButton';

type prop = {
  token?:string
}

const StaffDocuments = React.memo(({token}:prop) => {
  const [name, setName] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortStyle, setSortStyle] = useState<'symbol'|'list'>('symbol')

  const handleDownloadCV = async () => {
    if (!token) {
      setError("Authentication token not found.");
      return;
    }

    try {
      setLoading(true);
      await downloadCV(token);
      setError(null); 
    } catch (err: any) {
      setError(err.message || "Failed to download CV.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCV = async () => {
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }
  
      try {
        const cvData = await getCV(token);
        setName(cvData.name);
        setUrl(cvData.url);
      } catch (err: any) {
        setError(err.message || "Failed to obtain CV.");
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color={colors.primaryLight} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[{color:colors.errorText,}]}>{error}</Text>
      </View>
    );
  }

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
          handlePress={handleDownloadCV}
          containerStyles={globalStyles.btnOrange}
          textColor={colors.white}
          isLoading={loading}
        />

      </View>

      {name && sortStyle === 'symbol' &&
          <View style={[styles.symbolContainer]}>
            <View style={[styles.symbolCard]}>
              <Image source={require('@/assets/Images/pdf-icon.svg')} style={{width:24, height:24}} />
            </View>
            <Text>{name}</Text>
          </View>       
      }

      {name && sortStyle === 'list' &&
          <View style={[styles.listContainer]}>
            <View style={[styles.listIcon]}>
              <Image source={require('@/assets/Images/pdf-icon.svg')} style={{width:24, height:24}} />
            </View>
            <Text>{name}</Text>
          </View>       
      }
    </View>
  )
})

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