import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllBranches } from '@/api/backend'
import { Divider, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { IBranch, ICompany } from '@/types'
import { theme } from '@/constants/Theme'
import pageStyle from '@/constants/Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import EditBranchModal from './editBranch'

interface props {
  showEditButton: boolean;
  companyId:number;
  data: IBranch[];
  handleSuccess: () => void
}

const BranchList = ({showEditButton, companyId, data, handleSuccess}:props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [branchData, setBranchData] = useState<IBranch>()

  // const { data = [], isLoading, refetch } = useQuery({
  //   queryKey: ["all-branches"],
  //   queryFn: async () => {
  //     const response = getAllBranches()

  //     return response
  //   }
  // })

  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >

      { data.length === 0 && (
        <>
        {/* 🚧 Add Empty Message 🚧 */}
        </>
      )}
      
      { data.length !== 0 && data
        .slice(0, 2)
        .map((branch: IBranch, index: number, array: any[]) => (
          <View key={branch.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: theme.spacing.md,
                  alignItems: 'center',
                }}
              >

                <View 
                  style={{
                    backgroundColor: theme.colors.grey3, 
                    width: 40, 
                    height: 40, 
                    borderRadius: 100, 
                    alignItems:'center', 
                    justifyContent: 'center'
                  }}
                >
                  <MaterialCommunityIcons name='office-building' color={theme.colors.white} size={24} />
                </View>
                <View >
                  <Text 
                    style={{
                      ...pageStyle.headline03,
                      color: theme.colors.grey0,
                    }}
                  >
                    {branch.name}        
                  </Text>

                  <Text 
                    style={{
                      ...pageStyle.smText,
                      color: theme.colors.grey0,
                    }}
                  >
                  {`${branch.address}, ${branch.city}, ${branch.country}`}
                  </Text>
                  

                </View>

              </View>


              <View>
                { showEditButton && 
                  <TouchableOpacity
                    style={{
                      ...styles.itemEditButton,
                      backgroundColor: theme.colors.background
                    }}
                    onPress={() => {
                      setBranchData(branch)
                      setOpenEditModal(true)
                    }} 
                  >
                    <MaterialCommunityIcons 
                      name='pencil' 
                      size={24} 
                      color={ theme.mode === 'light'
                        ? theme.colors.grey3
                        : theme.colors.white
                      }
                    />
                  </TouchableOpacity>
                }
              </View>

            </View> 

            {index < array.length - 1 && 
              <Divider 
                color={theme.colors.greyOutline} 
                style={{marginTop: theme.spacing.md,}}
              />
            }
          </View>
        ))
      }

      {/* 🚧Add Dialog 'CreatePostDialog🚧' */}
      <EditBranchModal 
        data={branchData}
        visible={openEditModal}
        handleSuccess={() => handleSuccess()}
        onClose={() => setOpenEditModal(!openEditModal)}
      />
    </View>
  )
}

export default BranchList

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
})