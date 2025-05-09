import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Sizes, theme } from '@/constants/Theme';
import { CheckBox, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/authContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import pageStyle from '@/constants/Styles';

import { ICity, IUser } from '@/types';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserData } from '@/hooks/useUserData';
import PageOne from './Pages/PageOne';
import PageTwo from './Pages/PageTwo';
import PageThree from './Pages/PageThree';
import PageFour from './Pages/PageFour';
import PageFive from './Pages/PageFive';
import PageSix from './Pages/PageSix';

interface props {
  user: IUser;
  refetch: () => void
  visible: boolean;
  onClose: () => void;
}



const index = ({user, refetch, visible, onClose}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const { isLoading, authState:{ userData, userId } } = useAuth();

  const pages = [
    {
      page: <PageOne />,
      pageId: 1,
      pageNumber: 1,
    },
    {
      page: <PageTwo user={user} handleSuccess={refetch}/>,
      pageId: 2,
      pageNumber: 2,
    },
    {
      page: <PageThree user={user} handleSuccess={refetch}/>,
      pageId: 3,
      pageNumber: 3,
    },
    {
      page: <PageFour />,
      pageId: 4,
      pageNumber: 4,
    },
    {
      page: <PageFive />,
      pageId: 5,
      pageNumber: 5,
    },
    {
      page: <PageSix onClose={onClose} />,
      pageId: 6,
      pageNumber: 6,
    },
  ];

  const [pageIndex, setPageIndex] = useState(0);

  const goToNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex(prev => prev + 1);
    }
  };
  
  const goToPrevious = () => {
    if (pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    }
  };

  const skipToLast = () => {
    setPageIndex(pages.length - 1);
  };

  return (
    <Modal
      visible={visible}
    >
      <View 
        style={{
          flex: 1, 
          position: 'relative',
          backgroundColor: theme.mode === "light" ? theme.colors.white : theme.colors.black
        }}
      >
        
        {/* Render current page component */}
        <View style={{ flex: 1, padding: theme.spacing.md }}>
          {pages[pageIndex].page}
        </View>

        {/* Skip Page */}
        {pageIndex < pages.length - 1 && 
          <TouchableOpacity
            onPress={skipToLast} // Jump to last page
            style={{...styles.skipButton, backgroundColor: theme.colors.secondary}}
          >
            <Text style={{...pageStyle.button16, color: theme.colors.white}}>{t("skip")}</Text>
            <MaterialCommunityIcons name='chevron-double-right' size={20} color={theme.colors.white} />
          </TouchableOpacity>
        }


        {pageIndex === pages.length - 1 ? (
          <View style={{...styles.pagenationComponent}}>
            <TouchableOpacity
              onPress={goToPrevious} // go to provious page
            >
              <Text style={{...pageStyle.button16}}>{t("previous")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{...styles.pagenationComponent}}>

            <TouchableOpacity
              onPress={goToPrevious} // go to provious page
            >
              <Text style={{...pageStyle.button16}}>{t("previous")}</Text>
            </TouchableOpacity>

            <View style={{...styles.row, alignItems: 'center'}}>
              {pages.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === pageIndex ? 12 : 8,
                    height: i === pageIndex ? 12 : 8,
                    borderRadius: 100,
                    gap: theme.spacing.xs,
                    backgroundColor: i === pageIndex ? theme.colors.primary : theme.colors.disabled,
                    
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={goToNext} // go to next page
            >
              <Text style={{...pageStyle.button16}}>{t("next")}</Text>
            </TouchableOpacity>

          </View>

        )}

      </View>
    </Modal>
  )
}

export default index


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing?.md
  },
  pagenationComponent: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    paddingHorizontal: Sizes.fixPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: theme.spacing?.xl,
    paddingVertical: theme.spacing?.md,
    borderRadius: 4,
    position: 'absolute', 
    bottom: 80, 
    right: Sizes.fixPadding,
    flexDirection:'row',
    gap: theme.spacing?.md,
    alignItems: 'center',
    zIndex: 99999,
  },

})